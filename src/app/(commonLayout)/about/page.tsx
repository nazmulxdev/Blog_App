export default async function AboutPage() {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return <div>This is about page</div>;
}
