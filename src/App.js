import React, { useState, useEffect } from 'react';
import { Users, Briefcase, MessageSquare, Check, Send, Shield, DollarSign, Heart, ArrowRight } from 'lucide-react';

const mockVeterans = [
  {
    id: 'v1',
    name: 'James Rodriguez',
    branch: 'Army',
    skills: ['Project Management', 'Logistics', 'Team Leadership'],
    accommodations: ['Remote work options', 'Flexible scheduling', 'PTSD/mental health accommodations'],
    location: 'Austin, TX',
    experience: '8 years military logistics',
    contact: { email: 'james.r@email.com', phone: '555-0101' }
  }
];

const mockEmployers = [
  {
    id: 'e1',
    company: 'TechVets Solutions',
    jobs: [
      {
        id: 'j1',
        title: 'IT Support Specialist',
        description: 'Provide technical support to clients. Remote-friendly position with flexible hours.',
        skills: ['IT Support', 'Customer Service', 'Troubleshooting'],
        accommodations: ['Remote work options', 'Flexible scheduling', 'Assistive technology provided', 'Wheelchair/mobility accessible'],
        location: 'San Diego, CA (Remote OK)',
        salary: '$55,000 - $70,000'
      }
    ],
    contact: { email: 'hr@techvets.com', phone: '555-0201', contactPerson: 'Mike Johnson' }
  },
  {
    id: 'e2',
    company: 'Patriot Logistics Inc',
    jobs: [
      {
        id: 'j2',
        title: 'Operations Manager',
        description: 'Lead logistics operations team. Understanding military background valued.',
        skills: ['Project Management', 'Logistics', 'Team Leadership'],
        accommodations: ['Flexible scheduling', 'PTSD/mental health accommodations', 'Quiet workspace options', 'Service animal friendly'],
        location: 'Austin, TX',
        salary: '$65,000 - $85,000'
      }
    ],
    contact: { email: 'careers@patriotlogistics.com', phone: '555-0202', contactPerson: 'Lisa Martinez' }
  }
];

const povertyData = [
  { household: 1, annual: '$15,650', monthly: '$1,304' },
  { household: 2, annual: '$21,150', monthly: '$1,763' },
  { household: 3, annual: '$26,650', monthly: '$2,221' },
  { household: 4, annual: '$32,150', monthly: '$2,679' },
  { household: 5, annual: '$37,650', monthly: '$3,138' },
  { household: 6, annual: '$43,150', monthly: '$3,596' },
  { household: 7, annual: '$48,650', monthly: '$4,054' },
  { household: 8, annual: '$54,150', monthly: '$4,513' }
];

function App() {
  const [showEducation, setShowEducation] = useState(true);
  const [userType, setUserType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('home');
  const [matches, setMatches] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userType === 'veteran' && currentUser) {
      const matchedJobs = [];
      mockEmployers.forEach(employer => {
        employer.jobs.forEach(job => {
          const skillMatch = job.skills.some(skill => 
            currentUser.skills.includes(skill)
          );
          const accommodationMatch = currentUser.accommodations.every(need =>
            job.accommodations.includes(need)
          );
          
          if (skillMatch && accommodationMatch) {
            matchedJobs.push({
              ...job,
              employer: employer,
              matchScore: calculateMatchScore(currentUser, job)
            });
          }
        });
      });
      setMatches(matchedJobs.sort((a, b) => b.matchScore - a.matchScore));
    }
  }, [userType, currentUser]);

  const calculateMatchScore = (vet, job) => {
    const skillMatches = job.skills.filter(s => vet.skills.includes(s)).length;
    const accommodationMatches = vet.accommodations.filter(a => job.accommodations.includes(a)).length;
    return (skillMatches * 20) + (accommodationMatches * 15);
  };

  const handleNotifyEmployer = (job) => {
    setNotifications([...notifications, {
      type: 'employer_notified',
      job: job,
      timestamp: new Date()
    }]);
    alert(`Employer notified! Both you and ${job.employer.company} can now see each other's contact information.`);
  };

  const handleContactNow = (job) => {
    setActiveMessage({
      job: job,
      employer: job.employer,
      template: `Hi ${job.employer.contact.contactPerson},\n\nI'm ${currentUser.name}, a ${currentUser.branch} veteran interested in the ${job.title} position. My background in ${currentUser.skills.join(', ')} aligns well with this opportunity.\n\nI'd love to discuss how I can contribute to ${job.employer.company}.\n\nBest regards,\n${currentUser.name}\n\nProfile: [Auto-linked]\nContact: ${currentUser.contact.email} | ${currentUser.contact.phone}`
    });
    setView('messages');
  };

  const sendMessage = () => {
    alert('Message sent to employer!');
    setMessageText('');
    setActiveMessage(null);
    setView('matches');
  };

  if (showEducation && !userType) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gradient-to-r from-green-800 to-green-900 py-6 shadow-lg border-b-2 border-green-600">
          <div className="max-w-5xl mx-auto px-6 flex items-center gap-4">
            <Shield className="w-12 h-12 text-green-400" strokeWidth={2} />
            <div>
              <h1 className="text-3xl font-bold text-white" style={{ letterSpacing: '1px' }}>
                Veteran Ability Marketplace
              </h1>
              <p className="text-green-200 text-sm">Built by disabled vets, for disabled vets</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-xl p-8 mb-8 border-2 border-green-700 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <Heart className="w-12 h-12 text-green-400 flex-shrink-0 mt-1" strokeWidth={2} />
              <div>
                <h2 className="text-3xl font-bold text-green-300 mb-4">Hey Brother, Hey Sister...</h2>
                <p className="text-gray-200 text-lg leading-relaxed">
                  Let's talk real for a minute. You went from serving your country to feeling like you can't contribute anymore. That weight? We know it. The feeling that you went from <span className="text-green-400 font-bold">Hero to Zero</span>? We've been there too.
                </p>
              </div>
            </div>
            <p className="text-gray-200 text-lg leading-relaxed">
              But here's what the VA doesn't make clear enough: <span className="text-green-400 font-bold text-xl">YOU CAN STILL WORK.</span> Even with 100% disability. Even with TDIU (Total Disability Individual Unemployability). Let's clear up the confusion right now.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-green-700">
            <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <Check className="w-8 h-8" strokeWidth={3} />
              The Truth About TDIU and Working
            </h3>
            
            <div className="space-y-6 text-gray-200">
              <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-green-600">
                <p className="font-bold text-green-300 mb-2">FACT #1: You can work with TDIU</p>
                <p>The VA allows what's called "marginal employment" - you can earn up to the federal poverty line and still keep your full benefits. For 2025, that's <span className="text-green-400 font-bold">$15,650/year</span> for a single person.</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-green-600">
                <p className="font-bold text-green-300 mb-2">FACT #2: Protected Work Environments = EVEN MORE Income</p>
                <p>Here's the game-changer: If you work in a <span className="text-green-400 font-bold">Protected Work Environment</span>, you can earn MORE than the poverty threshold and still keep your TDIU benefits. No hard income cap.</p>
              </div>

              <div className="bg-gray-900 p-4 rounded-lg border-l-4 border-green-600">
                <p className="font-bold text-green-300 mb-2">What's a Protected Work Environment?</p>
                <p>Any job where your employer makes special accommodations for your service-connected disabilities. This includes:</p>
                <ul className="mt-2 ml-6 space-y-1 list-disc">
                  <li>Remote work options</li>
                  <li>Flexible scheduling (work around appointments, bad days)</li>
                  <li>Modified duties that account for your limitations</li>
                  <li>Mental health accommodations (PTSD-friendly workspace, understanding bosses)</li>
                  <li>Physical accommodations (wheelchair access, assistive tech)</li>
                  <li>More time off when you need it</li>
                </ul>
              </div>

              <div className="bg-green-900/30 p-4 rounded-lg border-l-4 border-green-500">
                <p className="text-green-300 font-semibold">The VA reviews these case-by-case, but if your employer is truly accommodating your disabilities and you're not working at "full capacity" like a civilian without disabilities would - you're likely in a protected environment.</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 mb-8 border border-green-700">
            <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <DollarSign className="w-8 h-8" strokeWidth={3} />
              2025 Federal Poverty Line Income Limits
            </h3>
            <p className="text-gray-200 mb-4">This is what you can earn in "marginal employment" while keeping full TDIU benefits:</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-900">
                    <th className="border border-green-700 px-4 py-3 text-left text-green-300 font-bold">Household Size</th>
                    <th className="border border-green-700 px-4 py-3 text-left text-green-300 font-bold">Annual Income</th>
                    <th className="border border-green-700 px-4 py-3 text-left text-green-300 font-bold">Monthly Income</th>
                  </tr>
                </thead>
                <tbody>
                  {povertyData.map((row) => (
                    <tr key={row.household} className="bg-gray-900 hover:bg-gray-850">
                      <td className="border border-green-700 px-4 py-3 text-gray-200 font-semibold">{row.household} person</td>
                      <td className="border border-green-700 px-4 py-3 text-green-300 font-bold">{row.annual}</td>
                      <td className="border border-green-700 px-4 py-3 text-gray-300">{row.monthly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-sm mt-4 italic">* For households larger than 8, add $5,500 per additional person</p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-8 border-2 border-green-700 shadow-xl">
            <h3 className="text-2xl font-bold text-green-400 mb-4">What This Platform Does</h3>
            <p className="text-gray-200 text-lg leading-relaxed mb-6">
              We're disabled vets who built this to help our brothers and sisters. This isn't some corporate job board that doesn't understand your situation. This is a <span className="text-green-400 font-bold">matchmaking marketplace</span> that connects you with employers who:
            </p>
            <ul className="space-y-3 text-gray-200">
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                <span><strong className="text-green-300">Get it.</strong> They understand service-connected disabilities and actually want to accommodate you.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                <span><strong className="text-green-300">Provide protected work environments.</strong> Remote work, flex schedules, mental health support - whatever you need.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                <span><strong className="text-green-300">Match YOUR abilities.</strong> We match based on what you CAN do and what accommodations you NEED.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                <span><strong className="text-green-300">Keep it legal and safe.</strong> These jobs are designed to work within VA guidelines so you can earn income without risking your benefits.</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => {
                setShowEducation(false);
              }}
              className="bg-gradient-to-br from-green-700 to-green-800 p-8 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-green-900/40 transition-all transform hover:scale-105 border-2 border-green-600 group"
            >
              <Users className="w-16 h-16 text-green-300 mx-auto mb-4 group-hover:text-white transition-colors" strokeWidth={2} />
              <h2 className="text-2xl font-bold text-white mb-2" style={{ letterSpacing: '0.5px' }}>
                I'M A VETERAN
              </h2>
              <p className="text-green-100">Find jobs that match my abilities and need my skills</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-green-300 group-hover:text-white">
                <span className="font-semibold">Enter Platform</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>

            <button
              onClick={() => {
                setShowEducation(false);
                setUserType('employer');
              }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-green-900/40 transition-all transform hover:scale-105 border-2 border-gray-700 hover:border-green-600 group"
            >
              <Briefcase className="w-16 h-16 text-green-400 mx-auto mb-4 group-hover:text-green-300 transition-colors" strokeWidth={2} />
              <h2 className="text-2xl font-bold text-white mb-2" style={{ letterSpacing: '0.5px' }}>
                I'M AN EMPLOYER
              </h2>
              <p className="text-gray-300">Build a team with talented veterans who need the right environment</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-green-400 group-hover:text-green-300">
                <span className="font-semibold">Enter Platform</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              Built by disabled veterans, for disabled veterans. 100% free to use.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Data sources: VA.gov, HHS Federal Poverty Guidelines 2025, 38 C.F.R. § 4.16
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-14 h-14 text-green-500" strokeWidth={2} />
              <h1 className="text-4xl font-bold text-green-400" style={{ letterSpacing: '1px' }}>
                VETERAN ABILITY MARKETPLACE
              </h1>
            </div>
            <p className="text-xl text-gray-300">
              Connecting disabled veterans with mission-ready employers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => {
                setUserType('veteran');
                setCurrentUser(mockVeterans[0]);
                setView('matches');
              }}
              className="bg-gradient-to-br from-green-800 to-green-900 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-green-600"
            >
              <Users className="w-16 h-16 text-green-300 mx-auto mb-4" strokeWidth={2} />
              <h2 className="text-2xl font-bold text-white mb-2">VETERAN</h2>
              <p className="text-gray-200">Find employers who understand your needs</p>
            </button>

            <button
              onClick={() => {
                setUserType('employer');
                setCurrentUser(mockEmployers[0]);
                setView('profile');
              }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-2 border-gray-700 hover:border-green-600"
            >
              <Briefcase className="w-16 h-16 text-green-400 mx-auto mb-4" strokeWidth={2} />
              <h2 className="text-2xl font-bold text-white mb-2">EMPLOYER</h2>
              <p className="text-gray-200">Build your team with talented veterans</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userType === 'veteran') {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="bg-gradient-to-r from-green-800 to-green-900 text-white p-4 shadow-lg border-b border-green-700">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-400" strokeWidth={2} />
              <h1 className="text-2xl font-bold" style={{ letterSpacing: '1px' }}>
                VAM
              </h1>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/40 px-4 py-2 rounded border border-green-700">
              <span className="text-sm font-semibold">{currentUser.name}</span>
              <Users className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border-b border-green-800/30">
          <div className="max-w-6xl mx-auto flex gap-2 p-2">
            <button
              onClick={() => setView('matches')}
              className={`flex-1 py-3 px-4 rounded flex items-center justify-center gap-2 font-bold transition-all ${
                view === 'matches' 
                  ? 'bg-green-700 text-white border border-green-500' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>Job Matches</span>
            </button>
            <button
              onClick={() => setView('profile')}
              className={`flex-1 py-3 px-4 rounded flex items-center justify-center gap-2 font-bold transition-all ${
                view === 'profile' 
                  ? 'bg-green-700 text-white border border-green-500' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>My Profile</span>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          {view === 'matches' && (
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-6">Your Job Matches</h2>
              {matches.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
                  <p className="text-gray-400">No matches yet. Update your profile to find opportunities!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.map(job => (
                    <div key={job.id} className="bg-gray-800 border border-green-800 rounded-lg shadow-lg p-6 hover:border-green-600 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-green-400">{job.title}</h3>
                          <p className="text-green-300 font-semibold">{job.employer.company}</p>
                          <p className="text-gray-400 text-sm">{job.location}</p>
                        </div>
                        <div className="bg-green-700 text-white px-3 py-1 rounded font-bold text-sm">
                          {job.matchScore}% Match
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{job.description}</p>

                      <div className="mb-4">
                        <p className="font-bold text-green-400 mb-2 text-sm">REQUIRED SKILLS:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map(skill => (
                            <span key={skill} className="bg-gray-700 text-green-300 px-3 py-1 rounded text-sm border border-green-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-bold text-green-400 mb-2 text-sm">ACCOMMODATIONS PROVIDED:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.accommodations.map(acc => (
                            <span key={acc} className="bg-green-900/30 text-green-300 px-3 py-1 rounded text-sm flex items-center gap-1 border border-green-700">
                              <Check className="w-3 h-3" strokeWidth={2.5} />
                              {acc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4 p-3 bg-gray-900 rounded border border-gray-700">
                        <p className="text-gray-300"><span className="text-green-400 font-bold">Salary:</span> {job.salary}</p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleNotifyEmployer(job)}
                          className="flex-1 bg-green-700 text-white py-3 px-4 rounded font-bold hover:bg-green-600 transition-colors"
                        >
                          Notify Employer
                        </button>
                        <button
                          onClick={() => handleContactNow(job)}
                          className="flex-1 bg-gray-700 text-green-400 py-3 px-4 rounded font-bold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 border border-green-700"
                        >
                          <MessageSquare className="w-5 h-5" />
                          Contact Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {view === 'profile' && (
            <div className="bg-gray-800 rounded-lg border border-green-800 shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-6">My Profile</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-3">
                  <label className="font-bold text-green-400 text-sm">NAME</label>
                  <p className="text-gray-200">{currentUser.name}</p>
                </div>
                
                <div className="border-b border-gray-700 pb-3">
                  <label className="font-bold text-green-400 text-sm">MILITARY BRANCH</label>
                  <p className="text-gray-200">{currentUser.branch}</p>
                </div>

                <div className="border-b border-gray-700 pb-3">
                  <label className="font-bold text-green-400 text-sm">EXPERIENCE</label>
                  <p className="text-gray-200">{currentUser.experience}</p>
                </div>

                <div className="border-b border-gray-700 pb-3">
                  <label className="font-bold text-green-400 text-sm">LOCATION</label>
                  <p className="text-gray-200">{currentUser.location}</p>
                </div>

                <div className="border-b border-gray-700 pb-3">
                  <label className="font-bold text-green-400 block mb-2 text-sm">SKILLS</label>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills.map(skill => (
                      <span key={skill} className="bg-gray-700 text-green-300 px-3 py-1 rounded text-sm border border-green-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-b border-gray-700 pb-3">
                  <label className="font-bold text-green-400 block mb-2 text-sm">ACCOMMODATION NEEDS</label>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.accommodations.map(acc => (
                      <span key={acc} className="bg-green-900/30 text-green-300 px-3 py-1 rounded text-sm border border-green-700">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-green-400 text-sm">CONTACT INFORMATION</label>
                  <p className="text-gray-200">{currentUser.contact.email}</p>
                  <p className="text-gray-200">{currentUser.contact.phone}</p>
                </div>
              </div>
            </div>
          )}

          {view === 'messages' && activeMessage && (
            <div className="bg-gray-800 rounded-lg border border-green-800 shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-2">Contact Employer</h2>
              <p className="text-gray-400 mb-6">Sending message to {activeMessage.employer.company} about {activeMessage.job.title}</p>
              
              <div className="mb-4">
                <label className="font-bold text-green-400 block mb-2 text-sm">YOUR MESSAGE</label>
                <textarea
                  value={messageText || activeMessage.template}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full h-64 p-4 bg-gray-900 border border-green-700 rounded text-gray-300"
                  placeholder="Write your introduction message..."
                />
              </div>

              <div className="bg-green-900/20 border border-green-700 p-4 rounded mb-6">
                <p className="text-sm text-green-300 font-semibold">
                  AUTO-INCLUDED: Your profile link and contact information will be automatically attached to this message.
                </p>
              </div>

              <div className="flex gap-3
