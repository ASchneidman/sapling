/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This software may be used and distributed according to the terms of the
 * GNU General Public License version 2.
 */

use std::collections::BTreeMap;

use smallvec::SmallVec;

#[derive(Clone, Debug)]
pub struct TrieMap<V> {
    pub value: Option<Box<V>>,
    pub edges: BTreeMap<u8, Self>,
}

impl<V> Default for TrieMap<V> {
    fn default() -> Self {
        Self {
            value: Default::default(),
            edges: Default::default(),
        }
    }
}

impl<V: PartialEq> PartialEq for TrieMap<V> {
    fn eq(&self, other: &Self) -> bool {
        self.value == other.value && self.edges == other.edges
    }
}

impl<V> TrieMap<V> {
    pub fn get<K: AsRef<[u8]>>(&self, key: K) -> Option<&V> {
        let mut node = self;
        for next_byte in key.as_ref() {
            match node.edges.get(next_byte) {
                Some(child) => node = child,
                None => return None,
            }
        }
        node.value.as_ref().map(|value| value.as_ref())
    }

    pub fn insert<K: AsRef<[u8]>>(&mut self, key: K, value: V) -> Option<V> {
        let node = key.as_ref().iter().fold(self, |node, next_byte| {
            node.edges.entry(*next_byte).or_default()
        });

        node.value.replace(Box::new(value)).map(|v| *v)
    }

    pub fn expand(self) -> (Option<V>, Vec<(u8, Self)>) {
        (self.value.map(|v| *v), self.edges.into_iter().collect())
    }

    pub fn is_empty(&self) -> bool {
        self.value.is_none() && self.edges.is_empty()
    }

    pub fn clear(&mut self) {
        self.value = None;
        self.edges.clear();
    }
}

impl<V> TrieMap<V>
where
    V: Default,
{
    pub fn get_or_insert_default<K: AsRef<[u8]>>(&mut self, key: K) -> &mut V {
        let node = key.as_ref().iter().fold(self, |node, next_byte| {
            node.edges
                .entry(*next_byte)
                .or_insert_with(Default::default)
        });

        node.value.get_or_insert_with(Default::default)
    }
}

pub struct TrieMapIter<V> {
    bytes: SmallVec<[u8; 24]>,
    value: Option<Box<V>>,
    stack: Vec<std::collections::btree_map::IntoIter<u8, TrieMap<V>>>,
}

impl<V> IntoIterator for TrieMap<V> {
    type Item = (SmallVec<[u8; 24]>, V);
    type IntoIter = TrieMapIter<V>;

    fn into_iter(self) -> Self::IntoIter {
        TrieMapIter {
            bytes: Default::default(),
            value: self.value,
            stack: vec![self.edges.into_iter()],
        }
    }
}

impl<V> Iterator for TrieMapIter<V> {
    type Item = (SmallVec<[u8; 24]>, V);

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            if let Some(value) = self.value.take() {
                return Some((SmallVec::from_slice(self.bytes.as_ref()), *value));
            }

            match self.stack.last_mut() {
                None => return None,
                Some(iter) => match iter.next() {
                    None => {
                        self.bytes.pop();
                        self.stack.pop();
                    }
                    Some((next_byte, child)) => {
                        self.bytes.push(next_byte);
                        self.value = child.value;
                        self.stack.push(child.edges.into_iter());
                    }
                },
            };
        }
    }
}

impl<K: AsRef<[u8]>, V> Extend<(K, V)> for TrieMap<V> {
    fn extend<T: IntoIterator<Item = (K, V)>>(&mut self, iter: T) {
        for (key, value) in iter {
            self.insert(key, value);
        }
    }
}

impl<K: AsRef<[u8]>, V> FromIterator<(K, V)> for TrieMap<V> {
    fn from_iter<I>(iter: I) -> Self
    where
        I: IntoIterator<Item = (K, V)>,
    {
        let mut trie_map: Self = Default::default();
        trie_map.extend(iter);
        trie_map
    }
}

#[cfg(test)]
mod test {
    use anyhow::Result;

    use super::*;

    #[test]
    fn trie_map() -> Result<()> {
        let mut trie_map: TrieMap<i32> = Default::default();

        assert_eq!(trie_map.insert("abcde", 1), None);
        assert_eq!(trie_map.insert("abcdf", 2), None);
        assert_eq!(trie_map.insert("bcdf", 3), None);
        assert_eq!(trie_map.insert("abcde", 4), Some(1));

        assert_eq!(
            trie_map.clone().into_iter().collect::<Vec<_>>(),
            vec![
                (SmallVec::from_slice("abcde".as_bytes()), 4),
                (SmallVec::from_slice("abcdf".as_bytes()), 2),
                (SmallVec::from_slice("bcdf".as_bytes()), 3),
            ]
        );

        assert_eq!(trie_map.get("abcde"), Some(&4));
        assert_eq!(trie_map.get("abcdd"), None);
        assert_eq!(trie_map.get("bcdf"), Some(&3));
        assert_eq!(trie_map.get("zzzz"), None);

        let value = trie_map.get_or_insert_default("abcde");
        assert_eq!(value, &4);
        *value = 5;
        assert_eq!(trie_map.get("abcde"), Some(&5));

        let value = trie_map.get_or_insert_default("zzzz");
        assert_eq!(value, &0);
        *value = 6;
        assert_eq!(trie_map.get("zzzz"), Some(&6));

        let (root_value, children) = trie_map.expand();

        assert_eq!(root_value, None);
        assert_eq!(children.len(), 3);
        assert_eq!(children[0].0, b'a');
        assert_eq!(children[1].0, b'b');
        assert_eq!(children[2].0, b'z');

        assert_eq!(
            children[0].1.clone().into_iter().collect::<Vec<_>>(),
            vec![
                (SmallVec::from_slice("bcde".as_bytes()), 5),
                (SmallVec::from_slice("bcdf".as_bytes()), 2),
            ]
        );

        assert_eq!(
            children[1].1.clone().into_iter().collect::<Vec<_>>(),
            vec![(SmallVec::from_slice("cdf".as_bytes()), 3)]
        );

        assert_eq!(
            children[2].1.clone().into_iter().collect::<Vec<_>>(),
            vec![(SmallVec::from_slice("zzz".as_bytes()), 6)]
        );

        Ok(())
    }
}