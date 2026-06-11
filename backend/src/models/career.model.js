import mongoose from "mongoose";

const careerInsightSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : "true"
    },
    resume : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Resume",
        required : "true"
    },
    analysis : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Analysis",
        required : "true"
    },
    careerLevel : {
        type : String,
        default : ""
    },

    strongAreas : [String],
    improvementAreas : [String],
    recommendedRoles : [String],
    learningRecommendations : [String],
    roadmap : [String],

    summary : {
        type :String,
        default : ""
    }
},
    {timestamps : true}
)


careerInsightSchema.index({user:1});
careerInsightSchema.index({resume:1});

const CareerInsight = mongoose.model("CareerInsight" , careerInsightSchema);
export default CareerInsight