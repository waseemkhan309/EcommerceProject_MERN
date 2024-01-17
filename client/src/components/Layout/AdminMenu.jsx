import { } from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            <div className="text-center">
                <div className="list-group">
                    <h5>Admin Panel</h5>
                    <NavLink to='/dashboard/admin/create-category' className="list-group-item list-group-item-action">
                        Create Category
                    </NavLink>
                    <NavLink to='/dashboard/admin/create-product' className="list-group-item list-group-item-action">
                        Create Products
                    </NavLink>
                    <NavLink to='/dashboard/admin/products' className="list-group-item list-group-item-action">
                        All Products List
                    </NavLink>
                    <NavLink to='/dashboard/admin/orders' className="list-group-item list-group-item-action">
                        Orders
                    </NavLink>
                    {/* <NavLink to='/dashboard/admin/users' className="list-group-item list-group-item-action">
                        Users
                    </NavLink> */}
                </div>

            </div>

        </>
    )
}

export default AdminMenu