import { groupRow } from "@shared/helpers/groupRow";

import { Model } from "@shared/interfaces";

interface ModelModalProps {
  models: Model[];
  handleModel: (model: Model) => void;
}

export function ModelModal({ models, handleModel }: ModelModalProps) {
  const modelsItems = groupRow(models);

  function handleClick(model: Model) {
    handleModel(model);

    const modalElement = document.getElementById("modelsModal");
    if (modalElement) {
      modalElement.click();
    }
  }

  return (
    <div className="modal modal-model fade" id="modelsModal" tabIndex={-1} role="dialog">
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modelos</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {models.length > 0 ? (
              <>
                {modelsItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((model) => (
                      <div
                        key={`model-${model.model_id}`}
                        className="col-md-4"
                        onClick={() => handleClick(model)}
                      >
                        <div className="box">
                          <div className="item">
                            <span>{model.model_name}</span>
                          </div>
                        </div>{" "}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <span>Nenhum modelo encontrado</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
