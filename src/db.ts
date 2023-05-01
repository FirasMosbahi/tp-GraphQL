import {Role, User} from "./entities/user";
import {v4} from "uuid";
import {Cv} from "./entities/cv";
import {Skill} from "./entities/skill";

class Db {
   public users : Array<User> = [];
   public cvs : Array<Cv> = [];
   public skills : Array<Skill> = [];
   constructor() {
      const u1 = this.addUser('firas','test@test.com',Role.ADMIN,[]);
      const s1 = this.addSkill('gql' , []);
      const cv1 = this.addCv('firas' , 18 ,'dev' , [s1] , u1);
      const s2 = this.addSkill('nest.js' , []);
      const cv2 = this.addCv('firas' , 21,'dev', [s1,s2],u1);
      console.log(this.cvs[0].skills[0].designation);
   }
   public addUser(name : string, email : string, role : Role, cvs : Array<Cv>) {
      const newUser = new User(v4(),name,email,role,[]);
      this.users.push(newUser);
      return newUser;
   }
   public addSkill(designation : string , cvs : Array<Cv>){
      const newSkill : Skill = new Skill(v4(),designation,cvs);
      this.skills.push(newSkill)
      for(let cv of cvs){
         cv.skills.push(newSkill);
      }
      return newSkill;
   }
   public addCv(name : string, age : number, job : string, skills : Array<Skill>, user : User){
      const newCv : Cv = new Cv(v4(),name,age,job,skills,user);
      this.cvs.push(newCv);
      user.Cvs.push(newCv);
      for(let skill of skills){
         skill.cvs.push(newCv);
      }
      return newCv;
   }
   public modifyCv(id : string ,name : string|null, age : number|null, job : string|null, skills : Array<Skill>|null, user : User|null){
      const cvToupdate : Cv = this.cvs.find((cv)=>cv.id===id);
      if(name != null){
         cvToupdate.name = name;
      }
      if(age != null){
         cvToupdate.age = age;
      }
      if(job != null){
         cvToupdate.job = job;
      }
      if(skills != null){
         for(let skill of this.skills){
            if(skill.cvs.includes(cvToupdate) && !(skills.includes(skill))){
               skill.cvs.filter(cv => cv != cvToupdate);
            }
            if(!skill.cvs.includes(cvToupdate) && skills.includes(skill)){
               skill.cvs.push(cvToupdate);
            }
         }
         cvToupdate.skills = [];
         for(let skill of skills){
            cvToupdate.skills.push(skill)
         }
      }
      if(user != null && cvToupdate.user!=user){
         cvToupdate.user.Cvs = cvToupdate.user.Cvs.filter(cv => cv != cvToupdate);
      }
      return cvToupdate;
   }
   deleteCv(id){
      const cvToDelete = this.cvs.find((cv)=> cv.id === id);
      if(cvToDelete !== null){
         this.cvs = this.cvs.filter(cv => cv !== cvToDelete);
         cvToDelete.user.Cvs = cvToDelete.user.Cvs.filter(cv => cv!==cvToDelete);
         for (const skill of this.skills){
            skill.cvs = skill.cvs.filter(cv => cv!==cvToDelete);
         }
      }
      return cvToDelete;
   }
}

export let db : Db = new Db();