export default function ProgramsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Programs</h1>
          <p className="text-xl text-muted-foreground">Comprehensive training programs for all skill levels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Technical Training</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Ball control and dribbling</li>
              <li>• Passing and receiving</li>
              <li>• Shooting techniques</li>
              <li>• Individual skill development</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Tactical Development</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Game awareness</li>
              <li>• Position-specific training</li>
              <li>• Team formations</li>
              <li>• Strategic decision making</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Physical Conditioning</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Speed and agility</li>
              <li>• Strength training</li>
              <li>• Endurance building</li>
              <li>• Injury prevention</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Mental Training</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Focus and concentration</li>
              <li>• Game preparation</li>
              <li>• Stress management</li>
              <li>• Team psychology</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Team Building</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Communication skills</li>
              <li>• Leadership development</li>
              <li>• Group activities</li>
              <li>• Team bonding events</li>
            </ul>
          </div>

          <div className="bg-card rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Match Preparation</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Pre-game routines</li>
              <li>• Match analysis</li>
              <li>• Recovery sessions</li>
              <li>• Performance review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 