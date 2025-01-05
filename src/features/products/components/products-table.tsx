import NoTableData from '@/components/ui/no-data/no-table-data';
import { Product } from '@/types/entity';

import ProductRow from './product-row';
interface IProductListProps {
  products: Partial<Product>[];
}
const ProductsTable = ({ products }: IProductListProps) => {
  console.log('children', products);

  return (
    <>
      <div className="card-body">
        <table
          id="departmentTable"
          className="table table-hover table-striped align-middle mb-0"
          style={{ width: '100%' }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price (Grd)</th>
              <th>Price (Whole)</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <ProductRow product={product} key={product.id ?? index++} />
              ))
            ) : (
              <>
                <NoTableData number={5} />
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsTable;
