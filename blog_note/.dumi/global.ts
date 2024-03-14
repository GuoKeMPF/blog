// .dumi/global.ts
import Prism from 'prism-react-renderer/prism';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-kotlin');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-rust');
require('prismjs/components/prism-toml');
