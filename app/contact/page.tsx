export default function ContactPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">Get in touch with the Badgers 2014 team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-card rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Training Location</h3>
                <p className="text-muted-foreground">Main Soccer Complex</p>
                <p className="text-muted-foreground">123 Sports Avenue</p>
              </div>
              
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-muted-foreground">info@badgers2014.com</p>
              </div>

              <div>
                <h3 className="font-semibold">Training Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 4:00 PM - 7:00 PM</p>
                <p className="text-muted-foreground">Saturday: 9:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border-input bg-background px-3 py-2"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border-input bg-background px-3 py-2"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-md border-input bg-background px-3 py-2"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground rounded-md py-2 hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}