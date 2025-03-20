// File: ProductTagsModal.tsx
import { useState, useCallback, useMemo } from 'react';
import { Modal, Button, Tab, Tabs } from 'react-bootstrap';

import {
  useGetProductTagsListQuery,
  useAddProductTagLinkMutation,
  useRemoveProductTagLinkMutation,
  useCreateProductTagMutation,
} from '@/services/product-tag';
import { Product, ProductTag, ProductTagLink } from '@/types/entity';

import TagBadge from './tag-badge';

interface ProductTagsModalProps {
  show: boolean;
  handleClose: () => void;
  product: Product;
  productTagLinks: ProductTagLink[] | undefined;
  onTagsUpdated?: () => void;
}

const ProductTagsModal: React.FC<ProductTagsModalProps> = ({
  show,
  handleClose,
  product,
  productTagLinks,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('manage');

  // Form state for new tag
  const [newTagName, setNewTagName] = useState<string>('');
  const [newTagDescription, setNewTagDescription] = useState<string>('');

  // API Queries/Mutations
  const { data: tagsData, isLoading: isLoadingTags } =
    useGetProductTagsListQuery();
  const [addTagLink, { isLoading: isAddingTag }] =
    useAddProductTagLinkMutation();
  const [removeTagLink, { isLoading: isRemovingTag }] =
    useRemoveProductTagLinkMutation();
  const [createTag, { isLoading: isCreatingTag }] =
    useCreateProductTagMutation();

  // Memoized filtered tags based on search term
  const filteredTags = useMemo(() => {
    if (!tagsData?.content.productTags) return [];

    return tagsData.content.productTags.filter(
      (tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !productTagLinks?.some((pt) => pt?.productTag?.id === tag.id),
    );
  }, [tagsData?.content.productTags, searchTerm, productTagLinks]);

  // Handle adding a tag to the product
  const handleAddTag = useCallback(
    async (tagId: number) => {
      try {
        addTagLink({
          productId: product.id,
          productTagId: tagId,
        });
      } catch (error) {
        console.error('Failed to add tag:', error);
      }
    },
    [product.id, addTagLink],
  );

  // Handle removing a tag from the product
  const handleRemoveTag = useCallback(
    async (tagLinkId: number) => {
      try {
        await removeTagLink({
          id: tagLinkId,
        });
      } catch (error) {
        console.error('Failed to remove tag:', error);
      }
    },
    [removeTagLink],
  );

  // Handle creating a new tag
  const handleCreateTag = useCallback(async () => {
    if (!newTagName.trim()) return;

    try {
      const result = await createTag({
        name: newTagName.trim(),
        description: newTagDescription.trim() || undefined,
      });

      // TypeScript type guard to check if result has expected shape
      if ('data' in result && result.data?.id) {
        const newTagId = result.data.id;

        // Automatically add the new tag to the product
        await handleAddTag(newTagId);

        // Reset form
        setNewTagName('');
        setNewTagDescription('');
        setActiveTab('manage'); // Switch back to manage tab
      }
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  }, [newTagName, newTagDescription, createTag, handleAddTag]);

  // Reset state when modal is closed
  const onModalClose = useCallback(() => {
    setSearchTerm('');
    setActiveTab('manage');
    handleClose();
  }, [handleClose]);

  // Memoize the current tags section
  const currentTagsSection = useMemo(
    () => (
      <div className="mb-4">
        <h6 className="fw-bold mb-2">Current Tags</h6>
        <div className="d-flex flex-wrap gap-2">
          {!productTagLinks || productTagLinks.length === 0 ? (
            <span className="text-muted fst-italic">No assigned tag</span>
          ) : (
            productTagLinks.map((tagLink, index) => (
              <TagBadge
                key={tagLink?.id || index}
                tag={tagLink?.productTag as ProductTag}
                onRemove={() => handleRemoveTag(tagLink?.id as number)}
                isRemovingTag={isRemovingTag}
              />
            ))
          )}
        </div>
      </div>
    ),
    [productTagLinks, handleRemoveTag, isRemovingTag],
  );

  // Memoize the search and add tags section
  const searchAndAddTagsSection = useMemo(
    () => (
      <div>
        <h6 className="fw-bold mb-2">Add tags</h6>
        <div className="input-group mb-3">
          <span className="input-group-text bg-light border-end-0">
            <i className="icofont-search-1"></i>
          </span>
          <input
            type="text"
            className="form-control border-start-0 ps-0"
            placeholder="Search Tags..."
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
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div
            className="d-flex flex-wrap gap-2 py-2"
            style={{ maxHeight: '220px', overflowY: 'auto' }}
          >
            {filteredTags.length === 0 ? (
              <div className="text-center w-100">
                <span className="text-muted fst-italic">No tag found</span>
                <div className="mt-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setActiveTab('create')}
                  >
                    <i className="icofont-plus me-1"></i>
                    Create new tag
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
                    type="button"
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
                    Create new tag
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    ),
    [filteredTags, searchTerm, isLoadingTags, isAddingTag, handleAddTag],
  );

  return (
    <Modal
      show={show}
      onHide={onModalClose}
      backdrop="static"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Tags Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || 'manage')}
          className="mb-4"
        >
          <Tab eventKey="manage" title="Manage Tags">
            {currentTagsSection}
            {searchAndAddTagsSection}
          </Tab>

          <Tab eventKey="create" title="Create Tag">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateTag();
              }}
            >
              <div className="mb-3">
                <label htmlFor="tagName" className="form-label">
                  Tag Name<span className="text-danger">*</span>
                </label>
                <input
                  id="tagName"
                  type="text"
                  className="form-control"
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  placeholder="Entrez le nom du tag"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="tagDescription" className="form-label">
                  Description (Optional)
                </label>
                <textarea
                  id="tagDescription"
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
                  type="submit"
                >
                  {isCreatingTag ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Création...
                    </>
                  ) : (
                    <>Create and add</>
                  )}
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductTagsModal;
