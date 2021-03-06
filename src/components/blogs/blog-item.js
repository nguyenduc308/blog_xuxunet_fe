import Link from 'next/link';

const BlogItem = ({blog}) => {
    return (
        <div className="blog-item">
            {blog.featured_image_url && <div className="blog-item-left">
              <img src={process.env.RESOURCES_DOMAIN + blog.featured_image_url} alt={blog.title} />
            </div>}
            <div className="blog-item-right">
                <Link href={'/bai-viet/' + blog.slug}>
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
