export const resolver = {
    Query: {
        getCvs : (parent,{},context,info) => {
            return context.db.cvs;
        },
        getCvById : (parent,{id}, context,info) => {
            return context.db.cvs.filter((cv)=> cv.id == id)[0];
        },
        getCvSkills : (parent,{id},context,info) => {
            return context.db.cvs.filter((cv) => cv.id === id)[0].skills;
        },
        getCvUser : (parent,{id},context,info) => {
            return context.db.cvs.filter((cv) => cv.id === id)[0].user;
        },
    },
    Mutation : {
        createCv : (parent, {input}, context, info) => {
            const skills = [];
            for(let id of input.skillsIDs){
                skills.push(context.db.skills.filter((skill) => skill.id === id))
            }
            const user = context.db.users.filter((user) => user.id === input.userID)[0];
            const newCv = context.db.addCv(input.name,input.age,input.job,skills,user);
            context.pubSub.publish("cvAdded", { cv : newCv });
            return newCv;
        },
        updateCv : (parent,{input},context,info) => {
            let skills = null;
            if(input.skills !== null){
                skills = [];
                for(let id of input.skillsIDs){
                    skills.push(context.db.skills.filter((skill) => skill.id === id))
                }
            }
            let user = null;
            if(input.user !== null){
                user = context.db.users.filter((user) => user.id === input.userID)[0];
            }
            const modifiedCv = context.db.modifyCv(input.id,input.name,input.age,input.job,skills,user);
            context.pubSub.publish("cvModified", { cv : modifiedCv });
            console.log(modifiedCv.skills);
            return modifiedCv;
        },
        deleteCv : (parent,{id},context,info) => {
            const deletedCv = context.db.deleteCv(id);
            context.pubSub.publish("cvDeleted", { cv : deletedCv });
            return deletedCv;
        }
    },
    Subscription : {
        cvAdded: {
            subscribe: (parent, args, { db, pubSub }) => pubSub.subscribe("cvAdded"),
            resolve: (payload) => { return payload;},
        },
        cvModified: {
            subscribe: (parent, args, { db, pubSub }) => pubSub.subscribe("cvModified"),
            resolve: (payload) => { return payload;},
        },
        cvDeleted: {
            subscribe: (parent, args, { db, pubSub }) => pubSub.subscribe("cvDeleted"),
            resolve: (payload) => { return payload;},
        },
    }
}