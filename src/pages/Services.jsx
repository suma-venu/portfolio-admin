import ContentManager from "../components/ContentManager";

const config = {
  title: "Services",
  singular: "Service",
  endpoint: "services",
  displayField: "title",
  secondaryField: "description",

  fields: [
    {
      name: "title",
      label: "Service Title",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "icon",
      label: "Icon",
    },
  ],
};

function Services() {
  return <ContentManager config={config} />;
}

export default Services;