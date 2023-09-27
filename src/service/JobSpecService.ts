import axios from "axios";

export default class JobSpecService{
    URL = `${process.env.BACK_URL}/api/job-specification`;

    getJobSpec = async (roleId: number) => (await axios.get(`${process.env.BACK_URL}/api/job-specification/${roleId}`)).data;
}