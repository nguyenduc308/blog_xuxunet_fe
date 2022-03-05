import Link from 'next/link';

const BlogItem = ({blog}) => {
    return (
        <div className="blog-item">
            {blog.featured_image_url && <div className="blog-item-left">
            </div>}
            <div className="blog-item-right">
                <Link href={'/blogs/' + blog.slug}>
                    <a>
                        <h3 className="blog-item-title">{blog.title}</h3>
                    </a>
                </Link>
                <p>
                    {blog.excerpt}
                </p>
            </div>
        </div>
    )
}

export default BlogItem;