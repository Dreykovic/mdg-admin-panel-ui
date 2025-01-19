import { Product } from '@/types/entity';
import { useState } from 'react';
import ProductMetadataEditForm from './edit';

type Props = {
  product: Product;
};

const ProductMetadata = ({ product }: Props) => {
  const [showUpdateProductMetadataModal, setShowUpdateProductMetadataModal] =
    useState(false);

  const handleUpdateProductMetadataModalClose = () =>
    setShowUpdateProductMetadataModal(false);
  const handleUpdateProductMetadataModalShow = () =>
    setShowUpdateProductMetadataModal(true);
  return (
    <>
      <div className="card teacher-card shadow">
        <div className="card-body  d-flex">
          <div className="profile-av pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
            <div
              className=" d-flex justify-content-center align-items-center rounded"
              style={{
                width: '100%',
                height: '200px', // Définissez une hauteur par défaut
                maxWidth: '400px', // Largeur maximale pour un rendu propre
                margin: 'auto', // Centre horizontalement dans les conteneurs
              }}
            >
              <i
                className="icofont-honey xl shadow-sm"
                style={{
                  fontSize: '7rem', // Taille de l'icône
                  // color: '#fff', // Couleur blanche pour contraste
                }}
              ></i>
            </div>
          </div>

          <div className="teacher-info border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
            <h6 className="mb-0 mt-2  fw-bold d-block fs-6">{product.name}</h6>

            <div className="video-setting-icon mt-3 pt-3 border-top">
              <p>{product.description}</p>
            </div>
            <div className="d-flex flex-wrap align-items-center ct-btn-set">
              <a
                href="#"
                className="btn btn-dark btn-sm mt-1"
                onClick={handleUpdateProductMetadataModalShow}
              >
                <i className="icofont-edit me-2 fs-6"></i>Edit
              </a>
            </div>
          </div>
        </div>
      </div>
      <ProductMetadataEditForm
        show={showUpdateProductMetadataModal}
        handleClose={handleUpdateProductMetadataModalClose}
        product={product}
      />
    </>
  );
};

export default ProductMetadata;
