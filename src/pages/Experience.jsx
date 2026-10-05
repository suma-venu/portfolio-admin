import ContentManager from "../components/ContentManager";

const config = {
  title: "Experience",
  singular: "Experience",
  endpoint: "experience",
  displayField: "position",
  secondaryField: "company",

  fields: [
    {
      name: "company",
      label: "Company",
      required: true,
    },
    {
      name: "position",
      label: "Position",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    {
      name: "start_date",
      label: "Start Date",
      type: "date",
    },
    {
      name: "end_date",
      label: "End Date",
      type: "date",
    },
  ],
};

function Experience() {
  return <ContentManager config={config} />;
}

export default Experience;