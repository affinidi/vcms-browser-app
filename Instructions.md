# How to issue your first VC in 10 mins

This is a step by step instructions that guides anyone to start using this github repository along with codesandbox and get started with building their first Verifiable Credential (VC).

### Step 1

Visit this [link](https://affinity-onboarding-frontend.staging.affinity-project.org/) to generate your API key and API Key Hash.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/apikey.JPG?raw=true)

Enter an unique username and click on Signup. You will get an API key and an API hash key. Store these keys somewhere safe where you wont loose it.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/apikey2.JPG?raw=true)

### Step 2

Visit this [link](https://v8pw8.csb.app/). It will redirect you to a codesandbox project.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/codesandboxproject.JPG?raw=true)

Click on the "Open Sandbox" button on the bottom right corner. You will be redirected to codesandbox editor.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/codesandboxeditor.JPG?raw=true)

### Step 3

Scroll throught the folder structure on left and open the `.env` file. Replace the `REACT_APP_API_KEY_HASH` attribute with your API Key Hash that you received in `Step 1`.

Save the `.env` file. Once you save, codesandbox creates a new link of the project.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/newlink.png?raw=true)

Now click on the `Open in New Window` button. This will run your newly created project on new tab.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/newwindow.png?raw=true)

### Step 4

Now you will have to sign up and create a account. You will be redirected to the dashboard after successfully creating your account.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/signup.JPG?raw=true)

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/dashboard.JPG?raw=true)

Next you have to click on the `Issue unsigned VC` button under the `ISSUER` column. And now you have your very own `Verifiable Credential`. You can follow the steps mentioned in the app to Sign, Store and Verify your VC.

![](https://github.com/affinityproject/vcms-browser-app/blob/shubham/instructions/vccreated.JPG?raw=true)
