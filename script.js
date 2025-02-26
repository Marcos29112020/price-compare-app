let products = [];
let editingIndex = -1; // -1 significa que não está editando, senão guarda o índice do produto

function addOrUpdateProduct() {
    const productName = document.getElementById('productName').value;
    const priceStore1 = parseFloat(document.getElementById('priceStore1').value) || 0;
    const priceStore2 = parseFloat(document.getElementById('priceStore2').value) || 0;
    const priceStore3 = parseFloat(document.getElementById('priceStore3').value) || 0;

    if (!productName || priceStore1 <= 0 || priceStore2 <= 0 || priceStore3 <= 0) {
        alert('Por favor, preencha todos os campos com valores válidos.');
        return;
    }

    const prices = [
        { store: 'S.Romeu', price: priceStore1 },
        { store: 'M.Jessé', price: priceStore2 },
        { store: 'S. Zé do Feira', price: priceStore3 }
    ];
    const bestOption = prices.reduce((min, current) => 
        current.price < min.price ? current : min
    ).store;

    const product = {
        name: productName,
        priceStore1: priceStore1,
        priceStore2: priceStore2,
        priceStore3: priceStore3,
        bestOption: bestOption
    };

    if (editingIndex === -1) {
        // Adicionar novo produto
        products.push(product);
    } else {
        // Atualizar produto existente
        products[editingIndex] = product;
        editingIndex = -1; // Resetar após edição
        document.querySelector('.input-section button').textContent = 'Adicionar Produto'; // Voltar texto do botão
    }

    updateTable();
    updateSummary();
    clearInputs();
}

function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('priceStore1').value = product.priceStore1;
    document.getElementById('priceStore2').value = product.priceStore2;
    document.getElementById('priceStore3').value = product.priceStore3;
    editingIndex = index;
    document.querySelector('.input-section button').textContent = 'Atualizar Produto';
}

function deleteProduct(index) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        products.splice(index, 1);
        updateTable();
        updateSummary();
    }
}

function updateTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.priceStore1.toFixed(2)}</td>
            <td>${product.priceStore2.toFixed(2)}</td>
            <td>${product.priceStore3.toFixed(2)}</td>
            <td>${product.bestOption}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editProduct(${index})">Editar</button>
                <button class="action-btn delete-btn" onclick="deleteProduct(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateSummary() {
    const totalStore1 = products.reduce((sum, p) => sum + p.priceStore1, 0);
    const totalStore2 = products.reduce((sum, p) => sum + p.priceStore2, 0);
    const totalStore3 = products.reduce((sum, p) => sum + p.priceStore3, 0);

    const totals = [totalStore1, totalStore2, totalStore3];
    const minTotal = Math.min(...totals);
    const maxTotal = Math.max(...totals);
    const savings = maxTotal - minTotal;

    document.getElementById('totalStore1').textContent = totalStore1.toFixed(2);
    document.getElementById('totalStore2').textContent = totalStore2.toFixed(2);
    document.getElementById('totalStore3').textContent = totalStore3.toFixed(2);
    document.getElementById('savings').textContent = savings.toFixed(2);
}

function clearInputs() {
    document.getElementById('productName').value = '';
    document.getElementById('priceStore1').value = '';
    document.getElementById('priceStore2').value = '';
    document.getElementById('priceStore3').value = '';
}