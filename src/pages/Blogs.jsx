import ContentManager from "../components/ContentManager";

const config = {
  title: "Blogs",
  singular: "Blog",
  endpoint: "blogs",
  displayField: "title",
  secondaryField: "slug",

  fields: [
    {
      name: "title",
      label: "Blog Title",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      required: true,
    },
    {
      name: "content",
      label: "Content",
      type: "textarea",
      required: true,
    },
    {
      name: "image_url",
      label: "Image URL",
    },
    {
      name: "published",
      label: "Published",
      type: "checkbox",
    },
  ],
};

function Blogs() {
  return <ContentManager config={config} />;
}

export default Blogs;