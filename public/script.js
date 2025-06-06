// Načtení dat při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    fetchRestaurants();
    fetchReviews();
});

// ===== RESTAURACE =====
// Přidání nové restaurace
document.getElementById('restaurant-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('restaurant-name').value;
    const address = document.getElementById('restaurant-address').value;
    
    try {
        const response = await fetch('/api/restaurants', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address })
        });
        
        if (response.ok) {
            document.getElementById('restaurant-form').reset();
            fetchRestaurants();
        } else {
            alert('Chyba při přidávání restaurace');
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
});

// Načtení seznamu restaurací
async function fetchRestaurants() {
    try {
        const response = await fetch('/api/restaurants');
        const restaurants = await response.json();
        const restaurantList = document.getElementById('restaurant-list');
        const restaurantSelect = document.getElementById('review-restaurant');
        
        restaurantList.innerHTML = '';
        restaurantSelect.innerHTML = '';
        
        restaurants.forEach(restaurant => {
            // Seznam restaurací
            const li = document.createElement('li');
            li.innerHTML = `<strong>${restaurant.name}</strong>: ${restaurant.address} 
                            <button onclick="showRestaurantDetail(${restaurant.id})">Detail</button>`;
            restaurantList.appendChild(li);
            
            // Select pro recenze
            const option = document.createElement('option');
            option.value = restaurant.id;
            option.textContent = restaurant.name;
            restaurantSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Chyba při načítání restaurací:', error);
    }
}

// Zobrazení detailu restaurace
async function showRestaurantDetail(id) {
    try {
        const response = await fetch(`/api/restaurants/${id}`);
        const restaurant = await response.json();
        
        document.getElementById('edit-restaurant-id').value = restaurant.id;
        document.getElementById('edit-restaurant-name').value = restaurant.name;
        document.getElementById('edit-restaurant-address').value = restaurant.address;
        
        document.getElementById('restaurant-detail').style.display = 'block';
    } catch (error) {
        console.error('Chyba při načítání detailu restaurace:', error);
    }
}

// Úprava restaurace
document.getElementById('restaurant-edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-restaurant-id').value;
    const name = document.getElementById('edit-restaurant-name').value;
    const address = document.getElementById('edit-restaurant-address').value;
    
    try {
        const response = await fetch(`/api/restaurants/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, address })
        });
        
        if (response.ok) {
            document.getElementById('restaurant-detail').style.display = 'none';
            fetchRestaurants();
        } else {
            alert('Chyba při úpravě restaurace');
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
});

// Smazání restaurace
document.getElementById('delete-restaurant').addEventListener('click', async () => {
    if (!confirm('Opravdu chcete smazat tuto restauraci?')) return;
    
    const id = document.getElementById('edit-restaurant-id').value;
    
    try {
        const response = await fetch(`/api/restaurants/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            document.getElementById('restaurant-detail').style.display = 'none';
            fetchRestaurants();
            fetchReviews(); // Aktualizujeme i recenze, protože některé mohly být smazány
        } else {
            alert('Chyba při mazání restaurace');
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
});

// Zrušení úpravy restaurace
document.getElementById('cancel-edit').addEventListener('click', () => {
    document.getElementById('restaurant-detail').style.display = 'none';
});

// ===== RECENZE =====
// Přidání nové recenze
document.getElementById('review-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const restaurant_id = document.getElementById('review-restaurant').value;
    const user_name = document.getElementById('review-user').value;
    const rating = document.getElementById('review-rating').value;
    const comment = document.getElementById('review-comment').value;
    
    try {
        const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restaurant_id, user_name, rating, comment })
        });
        
        if (response.ok) {
            document.getElementById('review-form').reset();
            fetchReviews();
        } else {
            alert('Chyba při přidávání recenze');
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
});

// Načtení seznamu recenzí
async function fetchReviews() {
    try {
        const [reviewsResponse, restaurantsResponse] = await Promise.all([
            fetch('/api/reviews'),
            fetch('/api/restaurants')
        ]);

        const reviews = await reviewsResponse.json();
        const restaurants = await restaurantsResponse.json();

        const reviewList = document.getElementById('review-list');
        reviewList.innerHTML = '';

        reviews.forEach(review => {
            const restaurant = restaurants.find(r => r.id === review.restaurant_id);
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${restaurant.name}</strong>: ${review.user_name}
                <div>Hodnocení: ${review.rating}</div>
                <div>Komentář: ${review.comment || 'Bez komentáře'}</div>
                <button onclick="showReviewDetail(${review.id})">Detail</button>
            `;
            reviewList.appendChild(li);
        });
    } catch (error) {
        console.error('Chyba při načítání recenzí:', error);
    }
}

// Zobrazení detailu recenze
async function showReviewDetail(id) {
    try {
        const response = await fetch(`/api/reviews/${id}`);
        const review = await response.json();
        
        document.getElementById('edit-review-id').value = review.id;
        document.getElementById('edit-review-user').value = review.user_name;
        document.getElementById('edit-review-rating').value = review.rating;
        document.getElementById('edit-review-comment').value = review.comment;
        
        document.getElementById('review-detail').style.display = 'block';
    } catch (error) {
        console.error('Chyba při načítání detailu recenze:', error);
    }
}

// Úprava recenze
document.getElementById('review-edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-review-id').value;
    const user_name = document.getElementById('edit-review-user').value;
    const rating = document.getElementById('edit-review-rating').value;
    const comment = document.getElementById('edit-review-comment').value;
    
    try {
        const response = await fetch(`/api/reviews/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_name, rating, comment })
        });
        
        if (response.ok) {
            document.getElementById('review-detail').style.display = 'none';
            fetchReviews();
        } else {
            alert('Chyba při úpravě recenze');
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
});

// Smazání recenze
document.getElementById('delete-review').addEventListener('click', async () => {
    if (!confirm('Opravdu chcete smazat tuto recenzi?')) return;
    
    const id = document.getElementById('edit-review-id').value;
    
    try {
        const response = await fetch(`/api/reviews/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            document.getElementById('review-detail').style.display = 'none';
            fetchReviews();
        } else {
            alert('Chyba při mazání recenze');
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
});

// Zrušení úpravy recenze
document.getElementById('cancel-review-edit').addEventListener('click', () => {
    document.getElementById('review-detail').style.display = 'none';
});