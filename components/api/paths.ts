const getHost = () => {
  return process.env.NEXT_PUBLIC_WORKFLOW_URL
}

const paths =  {
  login: () => `${getHost()}/api/admin/login`,
  getStates: () => `${getHost()}/api/admin/states`,
  getCity: (stateId: string | null) => `${getHost()}/api/admin/cities/${stateId}`,
  addProperty: () => `${getHost()}/api/admin/add/property`
}

export default paths;