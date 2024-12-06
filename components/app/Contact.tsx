export default function Contact() {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            We&apos;d love to hear from you! For any inquiries or support, feel free to reach out to us.
          </p>
          <div className="prose prose-lg dark:prose-invert">
            <p>
              You can contact us directly via email:
            </p>
            <a
              href="mailto:your-email@example.com"
              className="text-primary underline text-lg font-semibold"
            >
              mylinks.dev@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  }
  