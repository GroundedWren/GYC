window.GW = window.GW || {};
(function Controls(ns) {
	ns.ConftyEl = class ConftyEl extends HTMLElement {
		static InstanceCount = 0;
		static InstanceMap = {};

		//#region instance properties
		InstanceId;
		IsInitialized;
		//#endregion

		constructor() {
			super();
			this.InstanceId = ConftyEl.InstanceCount++;
			ConftyEl.InstanceMap[this.InstanceId] = this;

			if(this.InstanceId === 0) {
				document.head.insertAdjacentHTML("beforeend",`
				<style>
					gw-confidentiality > .wrapper{
						display: grid;
						grid-template-rows: auto auto auto;
						background-color: var(--warn-color);
						border-radius: 25px;
						margin-inline: 10px;
						padding: 7px;

						font-weight: bold;
						text-align: center;

						.gw-icon {
							width: 50px;
							height: 50px;
						}

						.preamble {
							font-size: 0.85em;
						}

						.tier {
							border-radius: 25px;
							padding-inline: 5px;

							&.one {
								background-color: var(--conf-tier-1-color);
								color: var(--conf-tier-1-txt-color);
							}
						}
					}
				</style>
				`);
			}
		}

		get IdKey() {
			return `gw-confidentiality-${this.InstanceId}`;
		}

		connectedCallback() {
			if (this.IsInitialized) { return; }

			this.innerHTML = `
				<div class="wrapper">
				<span class="preamble">CONFIDENTIAL</span>
				<gw-icon iconKey="eye-slash"></gw-icon>
				<strong class="tier ${this.getAttribute("tier")}">
					TIER ${this.getAttribute("tier").toUpperCase()}
				</strong>
				</div>
			`;

			this.isInitialized = true;
		}
	};
	customElements.define("gw-confidentiality", ns.ConftyEl);
}) (window.GW.Controls = window.GW.Controls || {});