import './style.css'
import { getValidProducts, checkProductStockAndGenerateReport } from './modules/products'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Product Management</h1>
    <div class="card">
      <button id="validateProducts">Validate Products</button>
      <button id="checkStock">Check Stock</button>
    </div>
    <p id="status"></p>
  </div>
`

const statusElement = document.querySelector<HTMLParagraphElement>('#status')!

document.querySelector<HTMLButtonElement>('#validateProducts')!.addEventListener('click', async () => {
  statusElement.textContent = 'Validating products...'
  try {
    await getValidProducts()
    statusElement.textContent = 'Product validation complete. Check console for details or download if a report was generated.'
  } catch (error) {
    statusElement.textContent = 'Error validating products. Check console for details.'
    console.error(error)
  }
})

document.querySelector<HTMLButtonElement>('#checkStock')!.addEventListener('click', async () => {
  statusElement.textContent = 'Checking stock...'
  try {
    await checkProductStockAndGenerateReport()
    statusElement.textContent = 'Stock check complete. Check console for details or download if a report was generated.'
  } catch (error) {
    statusElement.textContent = 'Error checking stock. Check console for details.'
    console.error(error)
  }
})