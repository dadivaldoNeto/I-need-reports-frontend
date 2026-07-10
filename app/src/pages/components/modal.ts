import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';

export function Createmodal(msg: string = 'Success', title: string = 'Operation') {
	return `

<!-- Modal -->
<div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="Modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="ModalLabel">${title}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>
      <div class="modal-body">
        ${msg}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
      </div>
    </div>
  </div>
</div>`
}

export function callModal() {
const modalElement = document.querySelector("#Modal")!
const modalInstance = Modal.getOrCreateInstance(modalElement);
modalInstance.show();

}