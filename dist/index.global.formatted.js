// Name: CLΩ
// ID: clomega
// Description: API blocks for CloudLink Omega. Unleash your potential.
// By: MikeDEV
// License: MIT

(() => {
  // src/index.ts
  (function (Scratch2) {
    if (!Scratch2.extensions.unsandboxed) {
      throw new Error("Sandboxed mode is not supported in this extension.");
    }
    function generateSlotsArray() {
      return Array.from({ length: 10 }, (_, i) => (i + 1).toString());
    }
    class OmegaAuth {
      // Declare types
      rootApiURL;
      rootWsURL;
      selectedUgi;
      registerSuccess;
      loginSuccess;
      saveSuccess;
      loadSuccess;
      sessionToken;
      statusCodes;
      loadedData;
      constructor() {
        this.rootApiURL = "https://omega.mikedev101.cc";
        this.rootWsURL = "wss://omega.mikedev101.cc";
        this.selectedUgi = "01HNPHRWS0N0AYMM5K4HN31V4W";
        this.registerSuccess = false;
        this.loginSuccess = false;
        this.saveSuccess = false;
        this.loadSuccess = false;
        (this.sessionToken = ""),
          (this.statusCodes = {
            register: "",
            login: "",
            load: "",
            save: "",
          });
        this.loadedData = "";
      }
      async Login(email, password) {
        try {
          const response = await fetch(`${this.rootApiURL}/api/v0/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
          const data = await response.text();
          if (response.ok) {
            console.log("Account logged in successfully.");
            this.sessionToken = data;
          } else {
            console.warn("Account login failed:", data);
          }
          this.loginSuccess = response.ok;
          this.statusCodes.login = response.status.toString();
        } catch (error) {
          console.error("Error getting login token:", error);
        }
      }
      async Save(save_slot, save_data) {
        try {
          const response = await fetch(`${this.rootApiURL}/api/v0/save`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: this.sessionToken,
              ugi: this.selectedUgi,
              save_slot,
              save_data,
            }),
          });
          const data = await response.text();
          if (response.ok) {
            console.log("Saved data successfully.");
          } else {
            console.warn("Save failed:", data);
          }
          this.saveSuccess = response.ok;
          this.statusCodes.save = response.status.toString();
        } catch (error) {
          console.error("Error saving data:", error);
        }
      }
      async Load(save_slot) {
        try {
          const response = await fetch(`${this.rootApiURL}/api/v0/load`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: this.sessionToken,
              ugi: this.selectedUgi,
              save_slot,
            }),
          });
          const data = await response.text();
          if (response.ok) {
            console.log("Loaded data successfully.");
            this.loadedData = data;
          } else {
            console.warn("Load failed:", data);
          }
          this.loadSuccess = response.ok;
          this.statusCodes.load = response.status.toString();
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
      async Register(email, username, password) {
        try {
          const response = await fetch(`${this.rootApiURL}/api/v0/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              username,
              password,
            }),
          });
          const data = await response.text();
          if (data == "OK") {
            console.log("Account registered successfully.");
          } else {
            console.warn("Account registration failed:", data);
          }
          this.registerSuccess = data == "OK";
          this.statusCodes.register = response.status.toString();
        } catch (error) {
          console.error("Error getting response:", error);
          this.registerSuccess = false;
        }
      }
    }
    const OmegaAuthInstance = new OmegaAuth();
    class CloudLinkOmega {
      // Declare types
      vm;
      runtime;
      blockIconURI;
      menuIconURI;
      constructor(runtime) {
        this.runtime = runtime;
        this.blockIconURI =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc3IiBoZWlnaHQ9IjEyMyIgdmlld0JveD0iMCAwIDE3NyAxMjMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xXzUzKSI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTM0LjMyIDM4LjUxMjlDMTU3LjU2MSAzOC41MTI5IDE3Ni4zOTkgNTcuMzUyMyAxNzYuMzk5IDgwLjU5MThDMTc2LjM5OSAxMDMuODMxIDE1Ny41NjEgMTIyLjY3MSAxMzQuMzIgMTIyLjY3MUg0Mi4wNzg5QzE4LjgzOCAxMjIuNjcxIDAgMTAzLjgzMSAwIDgwLjU5MThDMCA1Ny4zNTIzIDE4LjgzOCAzOC41MTI5IDQyLjA3ODkgMzguNTEyOUg0Ni4yNjc4QzQ4LjA3OTMgMTYuOTQyMyA2Ni4xNjEzIDAgODguMTk5MyAwQzExMC4yMzcgMCAxMjguMzE5IDE2Ljk0MjMgMTMwLjEzMSAzOC41MTI5SDEzNC4zMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMTcuMjc4IDk4Ljk3MDNDMTE3LjI3OCAxMDEuMzY0IDExNS4zMzggMTAzLjMwNCAxMTIuOTQ0IDEwMy4zMDRIOTcuNTQ4MkM5NS4xNTQ5IDEwMy4zMDQgOTMuMjE0OCAxMDEuMzY0IDkzLjIxNDggOTguOTcwM1Y4OS42MTU4QzkzLjIxNDggODcuOTQwOCA5NC4xODAzIDg2LjQxNTkgOTUuNjk0MiA4NS42OTkxQzEwMS41ODUgODIuOTExIDEwNS4zOTEgNzYuOTAxMyAxMDUuMzkxIDcwLjM4ODlDMTA1LjM5MSA2MS4wNTQ2IDk3Ljc5NjcgNTMuNDYwNCA4OC40NjIyIDUzLjQ2MDRDNzkuMTI3NyA1My40NjA0IDcxLjUzMzcgNjEuMDU0NiA3MS41MzM3IDcwLjM4ODlDNzEuNTMzNyA3Ni45MDE1IDc1LjMzOTkgODIuOTExIDgxLjIzMDUgODUuNjk5MUM4Mi43NDQ1IDg2LjQxNTYgODMuNzEgODcuOTQwNiA4My43MSA4OS42MTU4Vjk4Ljk3MDNDODMuNzEgMTAxLjM2NCA4MS43NyAxMDMuMzA0IDc5LjM3NjYgMTAzLjMwNEg2My45ODAyQzYxLjU4NjkgMTAzLjMwNCA1OS42NDY4IDEwMS4zNjQgNTkuNjQ2OCA5OC45NzAzQzU5LjY0NjggOTYuNTc3IDYxLjU4NjkgOTQuNjM2OSA2My45ODAyIDk0LjYzNjlINzUuMDQzM1Y5Mi4xODc1QzcxLjgwMDIgOTAuMTg5NCA2OS4wMzQyIDg3LjQ4NzcgNjYuOTQ5NiA4NC4yNjA3QzY0LjI3ODcgODAuMTI2MiA2Mi44NjY5IDc1LjMyOTYgNjIuODY2OSA3MC4zODg5QzYyLjg2NjkgNTYuMjc1NSA3NC4zNDg5IDQ0Ljc5MzYgODguNDYyMiA0NC43OTM2QzEwMi41NzYgNDQuNzkzNiAxMTQuMDU4IDU2LjI3NTUgMTE0LjA1OCA3MC4zODg3QzExNC4wNTggNzUuMzI5NCAxMTIuNjQ2IDgwLjEyNjIgMTA5Ljk3NSA4NC4yNjA1QzEwNy44OTEgODcuNDg3NSAxMDUuMTI1IDkwLjE4OTQgMTAxLjg4MiA5Mi4xODc1Vjk0LjYzNjlIMTEyLjk0NEMxMTUuMzM4IDk0LjYzNjkgMTE3LjI3OCA5Ni41NzcgMTE3LjI3OCA5OC45NzAzWiIgZmlsbD0iI0ZGNEQ0QyIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzFfNTMiPgo8cmVjdCB3aWR0aD0iMTc2LjM5OSIgaGVpZ2h0PSIxMjIuNjcxIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=";
        this.menuIconURI =
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjI2IiBoZWlnaHQ9IjIyNiIgdmlld0JveD0iMCAwIDIyNiAyMjYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xXzIpIj4KPHBhdGggZD0iTTAgMTEyLjY3N0MwIDUwLjQ0NzQgNTAuNDQ3NCAwIDExMi42NzcgMEMxNzQuOTA3IDAgMjI1LjM1NSA1MC40NDc0IDIyNS4zNTUgMTEyLjY3N0MyMjUuMzU1IDE3NC45MDcgMTc0LjkwNyAyMjUuMzU1IDExMi42NzcgMjI1LjM1NUM1MC40NDc0IDIyNS4zNTUgMCAxNzQuOTA3IDAgMTEyLjY3N1oiIGZpbGw9IiNGRjRENEMiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNTguNTM1IDgzLjc2MTJDMTgxLjc3NiA4My43NjEyIDIwMC42MTQgMTAyLjYwMSAyMDAuNjE0IDEyNS44NEMyMDAuNjE0IDE0OS4wOCAxODEuNzc2IDE2Ny45MTkgMTU4LjUzNSAxNjcuOTE5SDY2LjI5NDFDNDMuMDUzMiAxNjcuOTE5IDI0LjIxNTIgMTQ5LjA4IDI0LjIxNTIgMTI1Ljg0QzI0LjIxNTIgMTAyLjYwMSA0My4wNTMyIDgzLjc2MTIgNjYuMjk0MSA4My43NjEySDcwLjQ4M0M3Mi4yOTQ1IDYyLjE5MDcgOTAuMzc2NSA0NS4yNDg0IDExMi40MTQgNDUuMjQ4NEMxMzQuNDUyIDQ1LjI0ODQgMTUyLjUzNCA2Mi4xOTA3IDE1NC4zNDYgODMuNzYxMkgxNTguNTM1WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE0MS40OTMgMTQ0LjIxOUMxNDEuNDkzIDE0Ni42MTIgMTM5LjU1MyAxNDguNTUyIDEzNy4xNTkgMTQ4LjU1MkgxMjEuNzYzQzExOS4zNyAxNDguNTUyIDExNy40MyAxNDYuNjEyIDExNy40MyAxNDQuMjE5VjEzNC44NjRDMTE3LjQzIDEzMy4xODkgMTE4LjM5NSAxMzEuNjY0IDExOS45MDkgMTMwLjk0N0MxMjUuOCAxMjguMTU5IDEyOS42MDYgMTIyLjE1IDEyOS42MDYgMTE1LjYzN0MxMjkuNjA2IDEwNi4zMDMgMTIyLjAxMiA5OC43MDg3IDExMi42NzcgOTguNzA4N0MxMDMuMzQzIDk4LjcwODcgOTUuNzQ4OSAxMDYuMzAzIDk1Ljc0ODkgMTE1LjYzN0M5NS43NDg5IDEyMi4xNSA5OS41NTUxIDEyOC4xNTkgMTA1LjQ0NiAxMzAuOTQ3QzEwNi45NiAxMzEuNjY0IDEwNy45MjUgMTMzLjE4OSAxMDcuOTI1IDEzNC44NjRWMTQ0LjIxOUMxMDcuOTI1IDE0Ni42MTIgMTA1Ljk4NSAxNDguNTUyIDEwMy41OTIgMTQ4LjU1Mkg4OC4xOTU0Qzg1LjgwMiAxNDguNTUyIDgzLjg2MiAxNDYuNjEyIDgzLjg2MiAxNDQuMjE5QzgzLjg2MiAxNDEuODI1IDg1LjgwMiAxMzkuODg1IDg4LjE5NTQgMTM5Ljg4NUg5OS4yNTg1VjEzNy40MzZDOTYuMDE1NCAxMzUuNDM4IDkzLjI0OTQgMTMyLjczNiA5MS4xNjQ4IDEyOS41MDlDODguNDkzOSAxMjUuMzc1IDg3LjA4MjEgMTIwLjU3OCA4Ny4wODIxIDExNS42MzdDODcuMDgyMSAxMDEuNTI0IDk4LjU2NCA5MC4wNDIgMTEyLjY3NyA5MC4wNDJDMTI2Ljc5MSA5MC4wNDIgMTM4LjI3MyAxMDEuNTI0IDEzOC4yNzMgMTE1LjYzN0MxMzguMjczIDEyMC41NzggMTM2Ljg2MSAxMjUuMzc1IDEzNC4xOSAxMjkuNTA5QzEzMi4xMDYgMTMyLjczNiAxMjkuMzQgMTM1LjQzOCAxMjYuMDk3IDEzNy40MzZWMTM5Ljg4NUgxMzcuMTU5QzEzOS41NTMgMTM5Ljg4NSAxNDEuNDkzIDE0MS44MjUgMTQxLjQ5MyAxNDQuMjE5WiIgZmlsbD0iI0ZGNEQ0QyIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzFfMiI+CjxyZWN0IHdpZHRoPSIyMjUuMzU1IiBoZWlnaHQ9IjIyNS4zNTUiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
      }
      // Define blocks used in the extension
      getInfo() {
        return {
          id: "clomega",
          name: "CL\u03A9",
          docsURI:
            "https://github.com/cloudlink-omega/extension/wiki/Extension",
          blockIconURI: this.blockIconURI,
          menuIconURI: this.menuIconURI,
          color1: "#FF4D4C",
          color2: "#FF7473",
          color3: "#A13332",
          blocks: [
            {
              opcode: "set_ugi",
              blockType: Scratch2.BlockType.COMMAND,
              text: "Set [UGI] as this project's Unique Game ID (UGI)",
              arguments: {
                UGI: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "01HNPHRWS0N0AYMM5K4HN31V4W",
                },
              },
            },
            {
              opcode: "build_server_url",
              blockType: Scratch2.BlockType.REPORTER,
              text: "Signaling Server URL with set UGI",
            },
            {
              opcode: "change_api_url",
              blockType: Scratch2.BlockType.COMMAND,
              text: "Use [URL] as API Server",
              arguments: {
                URL: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "https://omega.mikedev101.cc",
                },
              },
            },
            {
              opcode: "change_wss_url",
              blockType: Scratch2.BlockType.COMMAND,
              text: "Use [URL] as Signaling Server",
              arguments: {
                URL: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "wss://omega.mikedev101.cc",
                },
              },
            },
            {
              opcode: "get_token",
              blockType: Scratch2.BlockType.REPORTER,
              text: "Session Token",
            },
            {
              opcode: "login_status_code",
              blockType: Scratch2.BlockType.REPORTER,
              text: "Login status code",
            },
            {
              opcode: "was_login_successful",
              blockType: Scratch2.BlockType.BOOLEAN,
              text: "Was login successful?",
            },
            {
              opcode: "login_account",
              blockType: Scratch2.BlockType.COMMAND,
              text: "Login with email: [EMAIL] password: [PASSWORD]",
              arguments: {
                EMAIL: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "",
                },
                PASSWORD: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "",
                },
              },
            },
            {
              opcode: "register_status_code",
              blockType: Scratch2.BlockType.REPORTER,
              text: "Registration status code",
            },
            {
              opcode: "was_register_successful",
              blockType: Scratch2.BlockType.BOOLEAN,
              text: "Was registration successful?",
            },
            {
              opcode: "register_account",
              blockType: Scratch2.BlockType.COMMAND,
              text: "Register with email: [EMAIL] username: [USERNAME] password: [PASSWORD]",
              arguments: {
                EMAIL: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "",
                },
                USERNAME: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "",
                },
                PASSWORD: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "",
                },
              },
            },
            {
              opcode: "save_status_code",
              blockType: Scratch2.BlockType.REPORTER,
              text: "Save status code",
            },
            {
              opcode: "was_save_successful",
              blockType: Scratch2.BlockType.BOOLEAN,
              text: "Was save successful?",
            },
            {
              opcode: "save_slot",
              blockType: Scratch2.BlockType.COMMAND,
              text: "Write to save slot [SLOT] with [DATA]",
              arguments: {
                SLOT: {
                  type: Scratch2.ArgumentType.NUMBER,
                  defaultValue: "1",
                  menu: "SlotMenu",
                },
                DATA: {
                  type: Scratch2.ArgumentType.STRING,
                  defaultValue: "something to save",
                },
              },
            },
            {
              opcode: "load_status_code",
              blockType: Scratch2.BlockType.REPORTER,
              text: "Load status code",
            },
            {
              opcode: "was_load_successful",
              blockType: Scratch2.BlockType.BOOLEAN,
              text: "Was load successful?",
            },
            {
              opcode: "loaded_slot_data",
              blockType: Scratch2.BlockType.REPORTER,
              text: "Loaded save data",
            },
            {
              opcode: "load_slot",
              blockType: Scratch2.BlockType.COMMAND,
              text: "Read from save slot [SLOT]",
              arguments: {
                SLOT: {
                  type: Scratch2.ArgumentType.NUMBER,
                  defaultValue: "1",
                  menu: "SlotMenu",
                },
              },
            },
          ],
          menus: {
            SlotMenu: {
              acceptReporters: true,
              items: generateSlotsArray(),
            },
          },
        };
      }
      change_api_url({ URL: URL2 }) {
        OmegaAuthInstance.rootApiURL = URL2;
      }
      change_wss_url({ URL: URL2 }) {
        OmegaAuthInstance.rootWsURL = URL2;
      }
      async login_account({ EMAIL, PASSWORD }) {
        await OmegaAuthInstance.Login(EMAIL.toString(), PASSWORD.toString());
      }
      register_status_code() {
        return OmegaAuthInstance.statusCodes.register;
      }
      login_status_code() {
        return OmegaAuthInstance.statusCodes.login;
      }
      save_status_code() {
        return OmegaAuthInstance.statusCodes.save;
      }
      load_status_code() {
        return OmegaAuthInstance.statusCodes.load;
      }
      was_save_successful() {
        return OmegaAuthInstance.saveSuccess;
      }
      async save_slot({ SLOT, DATA }) {
        await OmegaAuthInstance.Save(SLOT, DATA.toString());
      }
      was_load_successful() {
        return OmegaAuthInstance.loadSuccess;
      }
      loaded_slot_data() {
        return OmegaAuthInstance.loadedData;
      }
      async load_slot({ SLOT }) {
        await OmegaAuthInstance.Load(SLOT);
      }
      was_login_successful() {
        return OmegaAuthInstance.loginSuccess;
      }
      async register_account({ EMAIL, USERNAME, PASSWORD }) {
        await OmegaAuthInstance.Register(
          EMAIL.toString(),
          USERNAME.toString(),
          PASSWORD.toString()
        );
      }
      was_register_successful() {
        return OmegaAuthInstance.registerSuccess;
      }
      get_token() {
        return OmegaAuthInstance.sessionToken;
      }
      build_server_url() {
        const url = new URL(`${OmegaAuthInstance.rootWsURL}/api/v0/signaling`);
        url.searchParams.append("ugi", OmegaAuthInstance.selectedUgi);
        return url.toString();
      }
      set_ugi({ UGI }) {
        OmegaAuthInstance.selectedUgi = UGI.toString();
      }
    }
    if (Scratch2.vm?.runtime) {
      Scratch2.extensions.register(new CloudLinkOmega(Scratch2.runtime));
    } else {
      window.tempExt = {
        Extension: CloudLinkOmega,
        info: {
          extensionId: "clomega",
          name: "clomega.name",
          description: "clomega.description",
          featured: true,
          disabled: false,
          collaboratorList: [
            {
              collaborator: "MikeDEV",
              collaboratorURL: "https://github.com/MikeDev101",
            },
          ],
        },
        l10n: {
          en: {
            "clomega.name": "CL\u03A9",
            "clomega.description":
              "API blocks for CloudLink Omega. Unleash your potential.",
          },
        },
      };
    }
  })(Scratch);
})();
