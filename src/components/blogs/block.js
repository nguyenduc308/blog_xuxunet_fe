import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';


const BlockHtml = ({ block }) => {
  if (block.type === 'paragraph') {
    return <p dangerouslySetInnerHTML={{ __html: block.data.text }}></p>;
  }

  if (block.type === 'image') {
    return <img src={process.env.RESOURCES_DOMAIN + block.data.file.url} className="block-image"/>;
  }

  if (block.type === 'math') {
    return <BlockMath math={block.data.tex}></BlockMath>;
  }

  if (block.type === 'list') {
    return (
      <ol style={{ listStyleType: 'square', listStylePosition: 'inside' }}>
        {block.data.items.map((item) => {
          return (
            <li key={item} dangerouslySetInnerHTML={{ __html: item }}></li>
          );
        })}
      </ol>
    );
  }

  if (block.type === 'header') {
    switch (block.data.level) {
      case 1:
        return <h1 dangerouslySetInnerHTML={{ __html: block.data.text }}></h1>;
      default:
        return <h2 dangerouslySetInnerHTML={{ __html: block.data.text }}></h2>;
    }
  }

  return <></>;
};

export default BlockHtml;
