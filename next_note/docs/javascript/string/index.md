
## substr

`string.substr(start,length)`通过指定字符数返回在指定位置开始的字符串中的字符。

#### 参数

**start**:开始提取字符的位置。如果为负值，则被看作 strLength + start，其中 strLength 为字符串的长度（例如，如果 start 为 -3，则被看作 strLength + (-3)）。

**length**: 可选。提取的字符数。

start 是一个字符的索引。首字符的索引为 0，最后一个字符的索引为 字符串的长度减去 1。substr 从 start 位置开始提取字符，提取 length 个字符（或直到字符串的末尾）。

- 如果 start 为正值，且大于或等于字符串的长度，则 substr 返回一个空字符串。
- 如果 start 为负值，则 substr 把它作为从字符串末尾开始的一个字符索引。如果 start 为负值且 abs(start) 大于字符串的长度，则 substr 使用 0 作为开始提取的索引。注意负的 start 参数不被 Microsoft JScript 所支持。
- 如果 length 为 0 或负值，则 substr 返回一个空字符串。如果忽略 length，则 substr 提取字符，直到字符串末尾。

```ts
const str = 'abcdefghijklm n';
const substrStr = str.substr(5, 6);
console.log('substrStr', substrStr); // fghijk
console.log('str', str); // abcdefghijklm n
```

***

## substring

`string.substring(indexStart,indexEnd)`方法返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集。

#### 参数

**indexStart**:开始下标

**indexEnd**: 结束下标

#### 返回值

包含给定字符串的指定部分的新字符串。

- substring 提取从 indexStart 到 indexEnd（不包括）之间的字符。
- 如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
- 如果省略 indexEnd，substring 提取字符一直到字符串末尾。
- 如果任一参数小于 0 或为 NaN，则被当作 0。
- 如果任一参数大于 stringName.length，则被当作 stringName.length。
- 如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。

```ts
const str = 'abcdefghijklm n';
const substringStr = str.substring(2, 6);
console.log('substringStr', substringStr); // cdef
console.log('str', str); // abcdefghijklm n
```

***

## slice

`string.slice(beginIndex,endIndex)` 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

#### 参数

**beginIndex**:从该索引（以 0 为基数）处开始提取原字符串中的字符。如果值为负数，会被当做 strLength + beginIndex 看待，这里的 strLength 是字符串的长度（例如， 如果 beginIndex 是 -3 则看作是：strLength - 3）

**endIndex**:可选。在该索引（以 0 为基数）处结束提取字符串。如果省略该参数，slice() 会一直提取到字符串末尾。如果该参数为负数，则被看作是 strLength + endIndex，这里的 strLength 就是字符串的长度(例如，如果 endIndex 是 -3，则是, strLength - 3)。

#### 返回值

返回一个从原字符串中提取出来的新字符串

- slice() 从一个字符串中提取字符串并返回新字符串。在一个字符串中的改变不会影响另一个字符串。也就是说，slice 不会修改原字符串（只会返回一个包含了原字符串中部分字符的新字符串）。
- slice() 提取的新字符串包括 beginIndex 但不包括 endIndex。

```ts
const str = 'abcdefghijklm n';
const sliceStr = str.slice(5, -4);
console.log('sliceStr', sliceStr); // fghijk
console.log('str', str); // abcdefghijklm n
```

***

## split

`string.split(separator,limit)` 方法使用指定的分隔符字符串将一个 String 对象分割成子字符串数组，以一个指定的分割字串来决定每个拆分的位置。

#### 参数

**separator**：指定表示每个拆分应发生的点的字符串。separator 可以是一个字符串或正则表达式。 如果纯文本分隔符包含多个字符，则必须找到整个字符串来表示分割点。如果在 str 中省略或不出现分隔符，则返回的数组包含一个由整个字符串组成的元素。如果分隔符为空字符串，则将 str 原字符串中每个字符的数组形式返回。

**limit**：一个整数，限定返回的分割片段数量。当提供此参数时，split 方法会在指定分隔符的每次出现时分割该字符串，但在限制条目已放入数组时停止。如果在达到指定限制之前达到字符串的末尾，它可能仍然包含少于限制的条目。新数组中不返回剩下的文本。

#### 返回值

返回一个从原字符串中提取出来的新字符串

- slice() 从一个字符串中提取字符串并返回新字符串。在一个字符串中的改变不会影响另一个字符串。也就是说，slice 不会修改原字符串（只会返回一个包含了原字符串中部分字符的新字符串）。
- slice() 提取的新字符串包括 beginIndex 但不包括 endIndex。下面有两个例子。

```ts
const str = 'abcdefghijklm n';
const splitArr = str.split(/\s/g);
console.log('splitArr', splitArr); // [ 'abcdefghijklm', 'n' ]
console.log('str', str); // abcdefghijklm n
```
