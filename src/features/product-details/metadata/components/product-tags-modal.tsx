// File: ProductTagsModal.tsx
import { useState, useEffect } from 'react';
import { Modal, Button, Tab, Tabs } from 'react-bootstrap';

import {
  useGetProductTagsListQuery,
  useAddProductTagLinkMutation,
  useRemoveProductTagLinkMutation,
  useCreateProductTagMutation,
} from '@/store/api/product-tag';
import { Product, ProductTag } from '@/types/entity';

import TagBadge from './tag-badge';

type ProductTagsModalProps = {
  show: boolean;
  handleClose: () => void;
  product: Product;
  onTagsUpdated?: () => void;
};

const ProductTagsModal = ({
  show,
  handleClose,
  product,
  onTagsUpdated,
}: ProductTagsModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('manage');

  // Form state for new tag
  const [newTagName, setNewTagName] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');

  // API Queries/Mutations
  const { data: tagsData, isLoading: isLoadingTags } =
    useGetProductTagsListQuery();
  const [addTagLink, { isLoading: isAddingTag }] =
    useAddProductTagLinkMutation();
  const [removeTagLink, { isLoading: isRemovingTag }] =
    useRemoveProductTagLinkMutation();
  const [createTag, { isLoading: isCreatingTag }] =
    useCreateProductTagMutation();

  // Local state to track current product tags
  const [productTags, setProductTags] = useState<ProductTag[]>([]);

  // Initialize product tags
  useEffect(() => {
    if (product.productTagLinks) {
      const currentTags = product.productTagLinks.map(
        (link) => link.productTag,
      );
      setProductTags(currentTags as ProductTag[]);
    }
  }, [product, show]);

  // Filtered tags based on search term
  const filteredTags =
    tagsData?.content.productTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !productTags.some((pt) => pt.id === tag.id),
    ) || [];

  // Handle adding a tag to the product
  const handleAddTag = async (tagId: number) => {
    try {
      console.log('tag, ', tagId);
      const data = {
        productId: product.id,
        productTagId: tagId,
      };
      console.log('data, ', data);
      await addTagLink(data);

      // If successful, find the tag from the full list and add to local state
      const tagToAdd = tagsData?.content.productTags.find(
        (tag) => tag.id === tagId,
      );
      if (tagToAdd) {
        setProductTags([...productTags, tagToAdd]);
      }

      if (onTagsUpdated) onTagsUpdated();
    } catch (error) {
      console.error('Failed to add tag:', error);
    }
  };

  // Handle removing a tag from the product
  const handleRemoveTag = async (tagId: number) => {
    try {
      await removeTagLink({
        productId: product.id,
        productTagId: tagId,
      });
      console.log(isRemovingTag);
      // Update local state
      setProductTags(productTags.filter((tag) => tag.id !== tagId));

      if (onTagsUpdated) onTagsUpdated();
    } catch (error) {
      console.error('Failed to remove tag:', error);
    }
  };

  // Handle creating a new tag
  const handleCreateTag = async () => {
    if (!newTagName.trim()) return;

    try {
      const result = await createTag({
        name: newTagName.trim(),
        description: newTagDescription.trim() || undefined,
      });

      // TypeScript type guard to check if result has expected shape
      if ('data' in result) {
        const newTag = result.data;

        // Automatically add the new tag to the product
        await handleAddTag(newTag?.id as number);

        // Reset form
        setNewTagName('');
        setNewTagDescription('');
        setActiveTab('manage'); // Switch back to manage tab
      }
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  };

  // Reset state when modal is closed
  const onModalClose = () => {
    setSearchTerm('');
    setActiveTab('manage');
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={onModalClose}
      backdrop="static"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Gestion des tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'manage')}
          className="mb-4"
        >
          <Tab eventKey="manage" title="Gérer les tags">
            {/* Current Tags */}
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Tags actuels</h6>
              <div className="d-flex flex-wrap gap-2">
                {productTags.length === 0 ? (
                  <span className="text-muted fst-italic">
                    Aucun tag assigné
                  </span>
                ) : (
                  productTags.map((tag) => (
                    <TagBadge
                      key={tag.id}
                      tag={tag}
                      onRemove={() => handleRemoveTag(tag.id)}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Search & Add Tags */}
            <div>
              <h6 className="fw-bold mb-2">Ajouter des tags</h6>
              <div className="input-group mb-3">
                <span className="input-group-text bg-light border-end-0">
                  <i className="icofont-search-1"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Rechercher des tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {isLoadingTags ? (
                <div className="text-center py-3">
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  >
                    <span className="visually-hidden">Chargement...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="d-flex flex-wrap gap-2 py-2"
                    style={{ maxHeight: '220px', overflowY: 'auto' }}
                  >
                    {filteredTags.length === 0 ? (
                      <div className="text-center w-100">
                        <span className="text-muted fst-italic">
                          Aucun tag trouvé
                        </span>
                        <div className="mt-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setActiveTab('create')}
                          >
                            <i className="icofont-plus me-1"></i>
                            Créer un nouveau tag
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {filteredTags.map((tag) => (
                          <button
                            key={tag.id}
                            className="badge bg-light text-dark border-0 d-flex align-items-center p-2"
                            onClick={() => handleAddTag(tag.id)}
                            disabled={isAddingTag}
                          >
                            {tag.imageUrl && (
                              <img
                                src={tag.imageUrl}
                                alt=""
                                className="me-1 rounded-circle"
                                style={{ width: '16px', height: '16px' }}
                              />
                            )}
                            <span>{tag.name}</span>
                            <i
                              className="icofont-plus ms-1"
                              style={{ fontSize: '0.7rem' }}
                            ></i>
                          </button>
                        ))}

                        <div className="d-flex justify-content-center w-100 mt-3">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setActiveTab('create')}
                          >
                            <i className="icofont-plus me-1"></i>
                            Créer un nouveau tag
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </Tab>

          <Tab eventKey="create" title="Créer un tag">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  Nom du tag <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Entrez le nom du tag"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description (Optionnel)</label>
                <textarea
                  className="form-control"
                  value={newTagDescription}
                  onChange={(e) => setNewTagDescription(e.target.value)}
                  placeholder="Entrez une description pour ce tag"
                  rows={3}
                />
              </div>

              <div className="d-flex justify-content-end">
                <Button
                  variant="primary"
                  onClick={handleCreateTag}
                  disabled={!newTagName.trim() || isCreatingTag}
                >
                  {isCreatingTag ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Création en cours...
                    </>
                  ) : (
                    <>Créer et ajouter</>
                  )}
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onModalClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductTagsModal;
