import { getApiDocs } from '@/lib/swagger';
import SwaggerClient from '@/components/SwaggerClient';

export default async function DocsPage() {
    const spec = await getApiDocs();
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Documentation</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Comprehensive reference for the PrimeTrade API
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-6 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                    <SwaggerClient spec={spec} />
                </div>
            </div>
        </div>
    );
}
