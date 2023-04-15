import docusign from "docusign-esign";

const sendNDA = async (
  companyEmail: string,
  accessToken: string,
  templateId: number
) => {
  /*  const apiClient = new docusign.ApiClient();
  apiClient.setBasePath("https://demo.docusign.net/restapi");
  apiClient.addDefaultHeader("Authorization", `Bearer ${accessToken}`);
  docusign.Configuration.default.setDefaultApiClient(apiClient);

  const envelopesApi = new docusign.EnvelopesApi();

  // Create a new envelope using the NDA template
  const envelopeDefinition = new docusign.EnvelopeDefinition();
  envelopeDefinition.templateId = templateId;
  envelopeDefinition.status = "sent";

  // Set the company's email and name as the recipient
  const signer = new docusign.TemplateRole();
  signer.email = companyEmail;
  signer.name = "Company Representative";
  signer.roleName = "signer";
  envelopeDefinition.templateRoles = [signer];

  // Send the NDA
  try {
    const accountId = (await apiClient.getUserInfo(accessToken)).accounts[0]
      .accountId;
    const response = await envelopesApi.createEnvelope(accountId, {
      envelopeDefinition: envelopeDefinition,
    });
    console.log("Envelope has been sent. ID:", response.envelopeId);
  } catch (error) {
    console.error("Error sending NDA:", error);
  } */
};
export default docusign;
