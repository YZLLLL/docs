function FirstNotRepeatingChar( str ) {
  // write code here
  const map = new Map();
  for (let i  = 0; i < str.length; i++) {
      if ( map.has(str[i]) ) {
        map.delete(str[i]);
      } else {
        map.set(str[i], i);
      }
  }
  return map.values().next().value;
}

console.log(FirstNotRepeatingChar("abca"))

