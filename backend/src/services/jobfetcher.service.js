export const fetchRemotiveJobs = async (req,res) =>{
    try {
        const response = await fetch("https://remotive.com/api/remote-jobs");
        if (!response.ok) {
            throw new Error("Failed to fetch Jobs");
        }

        const data = await response.json();
        return data.jobs || [];
    } catch (error) {
        console.log(error.message);
        throw error
    }
}