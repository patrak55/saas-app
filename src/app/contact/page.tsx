export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg">
          You can contact us at{" "}
          <a href="mailto:contact@mystore.com" className="text-blue-600">
            contact@mystore.com
          </a>
        </p>
      </div>
    </main>
  );
}
