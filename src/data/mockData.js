export const SCANS = [
  { id:1,  name:'Web App Servers',  type:'Greybox',  status:'Completed', progress:100, vuln:[5,12,23,18], last:'4d ago' },
  { id:2,  name:'Web App Servers',  type:'Greybox',  status:'Completed', progress:100, vuln:[5,12,23,18], last:'4d ago' },
  { id:3,  name:'Web App Servers',  type:'Greybox',  status:'Completed', progress:100, vuln:[5,12,23,18], last:'4d ago' },
  { id:4,  name:'Web App Servers',  type:'Greybox',  status:'Completed', progress:100, vuln:[5,12,23,18], last:'4d ago' },
  { id:5,  name:'Web App Servers',  type:'Greybox',  status:'Completed', progress:100, vuln:[5,12,23,18], last:'4d ago' },
  { id:6,  name:'Web App Servers',  type:'Greybox',  status:'Completed', progress:100, vuln:[5,12,23,18], last:'4d ago' },
  { id:7,  name:'Web App Servers',  type:'Greybox',  status:'Completed', progress:100, vuln:[5,12,23,18], last:'4d ago' },
  { id:8,  name:'Web App Servers',  type:'Greybox',  status:'Scheduled', progress:100, vuln:[5,12],       last:'4d ago' },
  { id:9,  name:'Web App Servers',  type:'Greybox',  status:'Scheduled', progress:100, vuln:[5,12],       last:'4d ago' },
  { id:10, name:'IoT Devices',      type:'Blackbox', status:'Failed',    progress:10,  vuln:[2,4,8,1],    last:'3d ago' },
  { id:11, name:'Temp Data',        type:'Blackbox', status:'Failed',    progress:10,  vuln:[2,4,8,1],    last:'3d ago' },
  { id:12, name:'API Gateway',      type:'Whitebox', status:'Completed', progress:100, vuln:[3,7,15,9],   last:'5d ago' },
  { id:13, name:'Mobile Backend',   type:'Greybox',  status:'Completed', progress:100, vuln:[1,5,11,6],   last:'6d ago' },
  { id:14, name:'Admin Portal',     type:'Greybox',  status:'Scheduled', progress:0,   vuln:[],           last:'—'      },
  { id:15, name:'Database Cluster', type:'Blackbox', status:'Completed', progress:100, vuln:[8,14,20,12], last:'2d ago' },
];

export const LOGS = [
  { t:'09:00:00', parts:[{k:'p',v:"I'll begin a systematic penetration test on "},{k:'link',v:'helpdesk.democorp.com'},{k:'p',v:'. Let me start with reconnaissance and enumeration.'}] },
  { t:'09:01:00', parts:[{k:'p',v:'Good! target is online. Now let me perform port scanning to identify running services.'}] },
  { t:'09:02:00', parts:[{k:'p',v:'Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.'}] },
  { t:'09:03:00', parts:[{k:'p',v:'Great! I found a login page. I can see a useful comment: '},{k:'amber',v:'"TODO: Delete the testing account (test:test)"'},{k:'p',v:'. The login redirects to '},{k:'code',v:'/password/test'},{k:'p',v:'. Let me follow that path.'}] },
  { t:'09:04:00', parts:[{k:'p',v:"The POST method is not allowed on /password/test. It posts to "},{k:'amber',v:"'#'"},{k:'p',v:' which means the current page. Let me try a different approach.'}] },
  { t:'09:05:00', parts:[{k:'p',v:"It redirects back. Let me also try exploring with the "},{k:'amber',v:'test:test'},{k:'p',v:' password directly on other endpoints.'}] },
  { t:'09:06:00', parts:[{k:'p',v:"Great! I can access the dashboard using the "},{k:'hl',v:"'X-UserId: 10032'"},{k:'p',v:" header.\nThe dashboard shows \"Welcome, John Doe\". This suggests an "},{k:'bold',v:'IDOR vulnerability'},{k:'p',v:" - I can access any user's dashboard by just changing the X-UserId header."}] },
];

export const FINDINGS = [
  { sev:'Critical', time:'10:45:23', title:'SQL Injection in Authentication Endpoint',  ep:'/api/users/profile', desc:'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.' },
  { sev:'High',     time:'10:45:23', title:'Unauthorized Access to User Metadata',       ep:'/api/auth/login',    desc:'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.' },
  { sev:'Medium',   time:'10:45:23', title:'Broken Authentication Rate Limiting',        ep:'/api/search',        desc:'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.' },
];