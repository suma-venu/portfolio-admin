import ContentManager from "../components/ContentManager";

const config = {
  title: "Testimonials",
  singular: "Testimonial",
  endpoint: "testimonials",
  displayField: "name",
  secondaryField: "role",

  fields: [
    {
      name: "name",
      label: "Name",
      required: true,
    },
    {
      name: "role",
      label: "Role",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      required: true,
    },
    {
      name: "image_url",
      label: "Image URL",
    },
  ],
};

function Testimonials() {
  return <ContentManager config={config} />;
}

export default Testimonials;