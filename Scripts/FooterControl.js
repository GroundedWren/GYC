window.GW = window.GW || {};
(function Controls(ns) {
	ns.FooterEl = class FooterEl extends HTMLElement {
		static InstanceCount = 0;
		static InstanceMap = {};

		//#region instance properties
		InstanceId;
		IsInitialized;
		//#endregion

		constructor() {
			super();
			this.InstanceId = FooterEl.InstanceCount++;
			FooterEl.InstanceMap[this.InstanceId] = this;

			if(this.InstanceId === 0) {
				document.head.insertAdjacentHTML("beforeend",`
				<style>
					gw-footer {
						footer {
							margin-block-start: 10px;
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				`);
			}
		}

		get IdKey() {
			return `gw-footer-${this.InstanceId}`;
		}

		connectedCallback() {
			if (this.IsInitialized) { return; }

			this.innerHTML = `
				<footer>
					<div>
						World building by Cryo<br>Web design by Vera
					</div>
					<div>
						Created in ${this.getAttribute("date")}
					</div>
				</footer>
			`;

			this.isInitialized = true;
		}
	};
	customElements.define("gw-footer", ns.FooterEl);
}) (window.GW.Controls = window.GW.Controls || {});