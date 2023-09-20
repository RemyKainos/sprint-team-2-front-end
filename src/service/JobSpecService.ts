import axios from "axios";

const jobSpecService = {
    URL: `${process.env.BACK_URL}/api/job-specification`,
    getJobSpec: async (roleId: number) => (await axios.get(`${process.env.BACK_URL}/api/job-specification/${roleId}`)).data
} 
export default jobSpecService;