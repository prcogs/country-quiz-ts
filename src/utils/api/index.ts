

export const reqfetch = async (request: string | Request) => {
   try {
      const response = await fetch(request);
      const data = await response.json();

      return { data };
   } catch (error) {
      console.log('fetch error', error)
      return { error }
   }
}
