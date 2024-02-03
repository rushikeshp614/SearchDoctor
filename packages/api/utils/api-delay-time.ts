const delayAPI = async function delay(ms: number): Promise<void> {
     return new Promise((resolve) => setTimeout(resolve, ms));
    }
export default delayAPI
