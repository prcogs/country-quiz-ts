

export const reqfetch = async (request: string | Request): Promise<{ data?: any[] | undefined, error?: string | unknown}> => {
   try {
      const response = await fetch(request);
      const data: any[] = await response.json();

      return { data };
   } catch (error: unknown) {
      console.log('fetch error', error)
      return { error }
   }
}
