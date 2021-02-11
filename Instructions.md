# How to issue your first VC in 10 mins

This is a step by step instructions that guides anyone to start using this github repository along with codesandbox and get started with building their first Verifiable Credential (VC).

### Step 1

Visit this [link](https://affinity-onboarding-frontend.staging.affinity-project.org/) to generate your API key and API Key Hash.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/apikey.JPG?raw=true)

Enter an unique username and click on Signup. You will get an API key and an API hash key. Store these keys somewhere safe where you wont loose it. We only need API hash key.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/apikey2.JPG?raw=true)

### Step 2

Visit this [link](https://v8pw8.csb.app/). It will redirect you to a codesandbox project.

Click on the "Open Sandbox" button on the bottom right corner. You will be redirected to codesandbox editor.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/codesandboxproject.png?raw=true)

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/codesandboxeditor.JPG?raw=true)

### Step 3

Scroll throught the folder structure on left and open the `.env.example` file. Rename it to `.env`. Replace the `REACT_APP_API_KEY_HASH` attribute with your API Key Hash that you received in `Step 1`.

Save the `.env` file. Once you save, codesandbox creates a new link of the project.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/newlink.png?raw=true)

Now click on the `Open in New Window` button. This will run your newly created project on new tab.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/newwindow.png?raw=true)

### Step 4

Now you will have to sign up and create a account. The checkbox of terms and conditions is just a placeholder. We currently dont have any Terms and Conditions. You will be redirected to the dashboard after successfully creating your account.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/signup.JPG?raw=true)

Issuer - An entity that issues a credential. Eg: a test management facility like a hospital that issues a patient record like “Covid -ve“. Issuer has the right to revoke a credential

Verifier - An entity that verifies if the credential shared by a holder is valid (i.e. if the credential comes from a trusted issuer, not revoked by the issuer). Eg: An access management system installed at a facility like airport that allows / denies access based on if the holder is covid -ve/+ve. Verification could be a combination business logic like “is the credential is issued in the last 14 days” and “is it issued by an issuer that is recognized“

Holder - An entity that has lifecycle control over the issued credentials like sharing, deleting. Eg: A patient that holds a credential issued by an issuer on their wallet (a wallet could be an app that stores users credential data locally or a custodial wallet managed on behalf of a holder)

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/dashboard.JPG?raw=true)

Next you have to click on the `Issue unsigned VC` button under the `ISSUER` column. And now you have your very own `Verifiable Credential`. You can follow the steps mentioned in the app to Sign, Store and Verify your VC.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/vccreated.JPG?raw=true)

All stored VCs attached to a user account will be loaded and rendered on successful user login.

## Conclusion
