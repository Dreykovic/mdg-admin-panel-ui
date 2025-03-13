import { useState, useEffect, useMemo, useCallback } from 'react';
import { Modal, Button, Tab, Tabs, Spinner } from 'react-bootstrap';

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
  const [newTagName, setNewTagName] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');

  const { data: tagsData, isLoading: isLoadingTags } =
    useGetProductTagsListQuery();
  const [addTagLink, { isLoading: isAddingTag }] =
    useAddProductTagLinkMutation();
  const [removeTagLink, { isLoading: isRemovingTag }] =
    useRemoveProductTagLinkMutation();
  const [createTag, { isLoading: isCreatingTag }] =
    useCreateProductTagMutation();

  const [productTags, setProductTags] = useState<ProductTag[]>([]);

  useEffect(() => {
    if (product.productTagLinks) {
      setProductTags(
        product.productTagLinks.map((link) => link.productTag) as ProductTag[],
      );
    }
  }, [product, show]);

  const filteredTags = useMemo(
    () =>
      tagsData?.content.productTags.filter(
        (tag) =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !productTags.some((pt) => pt.id === tag.id),
      ) || [],
    [tagsData, searchTerm, productTags],
  );

  const handleAddTag = useCallback(
    async (tagId: number) => {
      try {
        await addTagLink({ productId: product.id, productTagId: tagId });

        const tagToAdd = tagsData?.content.productTags.find(
          (tag) => tag.id === tagId,
        );
        if (tagToAdd) {
          setProductTags((prevTags) => [...prevTags, tagToAdd]);
        }

        onTagsUpdated?.();
      } catch (error) {
        console.error('Failed to add tag:', error);
      }
    },
    [addTagLink, product.id, tagsData, onTagsUpdated],
  );

  const handleRemoveTag = useCallback(
    async (tagId: number) => {
      try {
        await removeTagLink({ productId: product.id, productTagId: tagId });
        setProductTags((prevTags) =>
          prevTags.filter((tag) => tag.id !== tagId),
        );
        console.log(isRemovingTag);
        onTagsUpdated?.();
      } catch (error) {
        console.error('Failed to remove tag:', error);
      }
    },
    [removeTagLink, product.id, onTagsUpdated],
  );

  const handleCreateTag = useCallback(async () => {
    if (!newTagName.trim()) return;

    try {
      const result = await createTag({
        name: newTagName.trim(),
        description: newTagDescription.trim() || undefined,
      });

      if ('data' in result) {
        const newTag = result.data;
        await handleAddTag(newTag?.id as number);

        setNewTagName('');
        setNewTagDescription('');
        setActiveTab('manage');
      }
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  }, [createTag, newTagName, newTagDescription, handleAddTag]);

  const onModalClose = useCallback(() => {
    setSearchTerm('');
    setActiveTab('manage');
    handleClose();
  }, [handleClose]);

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

            <div>
              <h6 className="fw-bold mb-2">Ajouter des tags</h6>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Rechercher des tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {isLoadingTags ? (
                <div className="text-center py-3">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {filteredTags.length === 0 ? (
                    <div className="text-center w-100">
                      <span className="text-muted fst-italic">
                        Aucun tag trouvé
                      </span>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="mt-2"
                        onClick={() => setActiveTab('create')}
                      >
                        Créer un nouveau tag
                      </Button>
                    </div>
                  ) : (
                    filteredTags.map((tag) => (
                      <button
                        key={tag.id}
                        className="badge bg-light text-dark border-0 d-flex align-items-center p-2"
                        onClick={() => handleAddTag(tag.id)}
                        disabled={isAddingTag}
                      >
                        {tag.name}
                        <i
                          className="icofont-plus ms-1"
                          style={{ fontSize: '0.7rem' }}
                        ></i>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </Tab>

          <Tab eventKey="create" title="Créer un tag">
            <div className="mb-3">
              <label className="form-label">Nom du tag *</label>
              <input
                type="text"
                className="form-control"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description (Optionnel)</label>
              <textarea
                className="form-control"
                value={newTagDescription}
                onChange={(e) => setNewTagDescription(e.target.value)}
                rows={3}
              />
            </div>
            <Button
              variant="primary"
              onClick={handleCreateTag}
              disabled={!newTagName.trim() || isCreatingTag}
            >
              {isCreatingTag ? (
                <Spinner animation="border" size="sm" className="me-1" />
              ) : (
                'Créer et ajouter'
              )}
            </Button>
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
