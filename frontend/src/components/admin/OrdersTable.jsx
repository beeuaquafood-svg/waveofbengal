const MOCK_ORDERS = [
    { id: 'ORD-8942', customer: 'Rahul Sharma', date: 'Oct 24, 2024', status: 'Delivered', amount: '₹ 1,850' },
    { id: 'ORD-8943', customer: 'Priya Patel', date: 'Oct 24, 2024', status: 'Processing', amount: '₹ 2,400' },
    { id: 'ORD-8944', customer: 'Amit Kumar', date: 'Oct 23, 2024', status: 'Shipped', amount: '₹ 950' },
    { id: 'ORD-8945', customer: 'Sneha Gupta', date: 'Oct 23, 2024', status: 'Delivered', amount: '₹ 3,200' },
    { id: 'ORD-8946', customer: 'Vikram Singh', date: 'Oct 22, 2024', status: 'Cancelled', amount: '₹ 1,100' },
]

export default function OrdersTable() {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-500/20 text-emerald-400'
            case 'Processing': return 'bg-amber-500/20 text-amber-400'
            case 'Shipped': return 'bg-sky-500/20 text-sky-400'
            case 'Cancelled': return 'bg-rose-500/20 text-rose-400'
            default: return 'bg-white/10 text-white/50'
        }
    }

    return (
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl-3xl overflow-hidden h-full shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-fraunces font-medium tracking-wide text-white">Recent Orders</h2>
                <button className="text-white/70 font-semibold hover:text-white transition-colors text-sm tracking-wide">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 text-white/50 text-xs font-semibold uppercase tracking-wider">
                            <th className="px-6 py-4">Order ID</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {MOCK_ORDERS.map((order) => (
                            <tr key={order.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                                <td className="px-6 py-5 font-medium tracking-wide text-white/90 group-hover:text-white">{order.id}</td>
                                <td className="px-6 py-5 text-white/80">{order.customer}</td>
                                <td className="px-6 py-5 text-white/50 font-mono text-sm">{order.date}</td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1.5 rounded-2xl text-xs font-semibold tracking-wide ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 font-heading text-lg font-bold text-white">{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
