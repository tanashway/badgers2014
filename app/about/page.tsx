export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">About Badgers 2014</h1>
          <p className="text-xl text-muted-foreground">Building tomorrow's champions today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-muted-foreground">
              Founded in 2014, the Badgers youth soccer team has been dedicated to developing young athletes
              both on and off the field. Our program focuses on building character, fostering teamwork,
              and nurturing soccer skills in a supportive environment.
            </p>
            
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              To provide a comprehensive youth soccer development program that emphasizes technical skills,
              tactical understanding, physical fitness, and character development. We strive to create an
              environment where young athletes can thrive and reach their full potential.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Core Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Excellence:</span>
                <span className="text-muted-foreground">
                  Striving for the highest standards in everything we do
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Teamwork:</span>
                <span className="text-muted-foreground">
                  Working together to achieve common goals
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Respect:</span>
                <span className="text-muted-foreground">
                  Showing consideration for teammates, opponents, and officials
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Development:</span>
                <span className="text-muted-foreground">
                  Focusing on long-term player growth and improvement
                </span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold">Training Philosophy</h2>
            <p className="text-muted-foreground">
              Our training methodology combines technical skill development, tactical awareness, and
              physical conditioning. We believe in creating a positive learning environment that
              encourages creativity and builds confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}