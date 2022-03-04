import Link from 'next/link';

const TagList = ({list}) => {
    if (!list || !Array.isArray(list)) list = [];

    return (
        <ul className="tag-list">
            {list.map((item) => {
                return <li className="tag-item" key={item.id}>
                    <Link href={'/' + item.category + '/' + item.slug}>
                        <a>{item.name}</a>
                    </Link>
                </li>
            })}
        </ul>
    )
}

export default TagList;