const BlockHtml = ({ block }) => {
  if (block.type === 'paragraph') {
    return <p dangerouslySetInnerHTML={{ __html: block.data.text }}></p>;
  }

  if (block.type === 'image') {
    return <img src={block.data.file.url} />;
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
