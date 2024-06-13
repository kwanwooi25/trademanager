import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','password','image','createdAt','updatedAt','companyId']);

export const AccountScalarFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state','createdAt','updatedAt']);

export const SessionScalarFieldEnumSchema = z.enum(['sessionToken','userId','expires','createdAt','updatedAt']);

export const CompanyScalarFieldEnumSchema = z.enum(['id','crn','name','phone','registeredAt','repName','repMobile','certificateUrl','createdAt','updatedAt']);

export const ProductScalarFieldEnumSchema = z.enum(['id','code','name','purchaseAt','createdAt','updatedAt','companyId']);

export const ProductOptionScalarFieldEnumSchema = z.enum(['id','name','imageUrl','unitPrice','currency','importedFrom','inventoryQuantity','leadtime','status','location','createdAt','updatedAt','productId','companyId']);

export const PurchaseOrderScalarFieldEnumSchema = z.enum(['id','orderedQuantity','orderedAt','receivedQuantity','receivedAt','status','createdAt','updatedAt','productOptionId','companyId']);

export const SaleScalarFieldEnumSchema = z.enum(['id','quantity','soldAt','createdAt','updatedAt','productOptionId','channelId','companyId']);

export const SalesChannelScalarFieldEnumSchema = z.enum(['id','name','url','createdAt','updatedAt','companyId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const UserOrderByRelevanceFieldEnumSchema = z.enum(['id','name','email','password','image','companyId']);

export const AccountOrderByRelevanceFieldEnumSchema = z.enum(['userId','type','provider','providerAccountId','refresh_token','access_token','token_type','scope','id_token','session_state']);

export const SessionOrderByRelevanceFieldEnumSchema = z.enum(['sessionToken','userId']);

export const CompanyOrderByRelevanceFieldEnumSchema = z.enum(['id','crn','name','phone','repName','repMobile','certificateUrl']);

export const ProductOrderByRelevanceFieldEnumSchema = z.enum(['id','code','name','purchaseAt','companyId']);

export const ProductOptionOrderByRelevanceFieldEnumSchema = z.enum(['id','name','imageUrl','location','productId','companyId']);

export const PurchaseOrderOrderByRelevanceFieldEnumSchema = z.enum(['id','productOptionId','companyId']);

export const SaleOrderByRelevanceFieldEnumSchema = z.enum(['id','productOptionId','channelId','companyId']);

export const SalesChannelOrderByRelevanceFieldEnumSchema = z.enum(['id','name','url','companyId']);

export const PurchaseOrderStatusSchema = z.enum(['ORDERED','RECEIVED']);

export type PurchaseOrderStatusType = `${z.infer<typeof PurchaseOrderStatusSchema>}`

export const ProductOptionStatusSchema = z.enum(['ON_SALE','SUSPENDED']);

export type ProductOptionStatusType = `${z.infer<typeof ProductOptionStatusSchema>}`

export const CurrencySchema = z.enum(['KRW','CNY','JPY']);

export type CurrencyType = `${z.infer<typeof CurrencySchema>}`

export const CountrySchema = z.enum(['KR','CN','JP']);

export type CountryType = `${z.infer<typeof CountrySchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().nullable(),
  password: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  companyId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.string().cuid(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().nullable(),
  registeredAt: z.coerce.date().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Company = z.infer<typeof CompanySchema>

/////////////////////////////////////////
// PRODUCT SCHEMA
/////////////////////////////////////////

export const ProductSchema = z.object({
  id: z.string().cuid(),
  code: z.string().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  companyId: z.string(),
})

export type Product = z.infer<typeof ProductSchema>

/////////////////////////////////////////
// PRODUCT OPTION SCHEMA
/////////////////////////////////////////

export const ProductOptionSchema = z.object({
  currency: CurrencySchema,
  importedFrom: CountrySchema,
  status: ProductOptionStatusSchema,
  id: z.string().cuid(),
  name: z.string(),
  imageUrl: z.string().nullable(),
  unitPrice: z.number(),
  inventoryQuantity: z.number().int(),
  leadtime: z.number().int(),
  location: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  productId: z.string(),
  companyId: z.string(),
})

export type ProductOption = z.infer<typeof ProductOptionSchema>

/////////////////////////////////////////
// PURCHASE ORDER SCHEMA
/////////////////////////////////////////

export const PurchaseOrderSchema = z.object({
  status: PurchaseOrderStatusSchema,
  id: z.string().cuid(),
  orderedQuantity: z.number().int(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().nullable(),
  receivedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  productOptionId: z.string(),
  companyId: z.string(),
})

export type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>

/////////////////////////////////////////
// SALE SCHEMA
/////////////////////////////////////////

export const SaleSchema = z.object({
  id: z.string().cuid(),
  quantity: z.number().int(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  productOptionId: z.string(),
  channelId: z.string(),
  companyId: z.string(),
})

export type Sale = z.infer<typeof SaleSchema>

/////////////////////////////////////////
// SALES CHANNEL SCHEMA
/////////////////////////////////////////

export const SalesChannelSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  url: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  companyId: z.string(),
})

export type SalesChannel = z.infer<typeof SalesChannelSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  password: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  companyId: z.boolean().optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  provider: z.boolean().optional(),
  providerAccountId: z.boolean().optional(),
  refresh_token: z.boolean().optional(),
  access_token: z.boolean().optional(),
  expires_at: z.boolean().optional(),
  token_type: z.boolean().optional(),
  scope: z.boolean().optional(),
  id_token: z.boolean().optional(),
  session_state: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z.object({
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  productOptions: z.union([z.boolean(),z.lazy(() => ProductOptionFindManyArgsSchema)]).optional(),
  purchaseOrders: z.union([z.boolean(),z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SaleFindManyArgsSchema)]).optional(),
  salesChannels: z.union([z.boolean(),z.lazy(() => SalesChannelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z.object({
  select: z.lazy(() => CompanySelectSchema).optional(),
  include: z.lazy(() => CompanyIncludeSchema).optional(),
}).strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z.object({
  users: z.boolean().optional(),
  products: z.boolean().optional(),
  productOptions: z.boolean().optional(),
  purchaseOrders: z.boolean().optional(),
  sales: z.boolean().optional(),
  salesChannels: z.boolean().optional(),
}).strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z.object({
  id: z.boolean().optional(),
  crn: z.boolean().optional(),
  name: z.boolean().optional(),
  phone: z.boolean().optional(),
  registeredAt: z.boolean().optional(),
  repName: z.boolean().optional(),
  repMobile: z.boolean().optional(),
  certificateUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  users: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  products: z.union([z.boolean(),z.lazy(() => ProductFindManyArgsSchema)]).optional(),
  productOptions: z.union([z.boolean(),z.lazy(() => ProductOptionFindManyArgsSchema)]).optional(),
  purchaseOrders: z.union([z.boolean(),z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SaleFindManyArgsSchema)]).optional(),
  salesChannels: z.union([z.boolean(),z.lazy(() => SalesChannelFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT
//------------------------------------------------------

export const ProductIncludeSchema: z.ZodType<Prisma.ProductInclude> = z.object({
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  options: z.union([z.boolean(),z.lazy(() => ProductOptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductArgsSchema: z.ZodType<Prisma.ProductDefaultArgs> = z.object({
  select: z.lazy(() => ProductSelectSchema).optional(),
  include: z.lazy(() => ProductIncludeSchema).optional(),
}).strict();

export const ProductCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductCountOutputTypeSelect> = z.object({
  options: z.boolean().optional(),
}).strict();

export const ProductSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
  id: z.boolean().optional(),
  code: z.boolean().optional(),
  name: z.boolean().optional(),
  purchaseAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  companyId: z.boolean().optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  options: z.union([z.boolean(),z.lazy(() => ProductOptionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PRODUCT OPTION
//------------------------------------------------------

export const ProductOptionIncludeSchema: z.ZodType<Prisma.ProductOptionInclude> = z.object({
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  purchaseOrders: z.union([z.boolean(),z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SaleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductOptionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProductOptionArgsSchema: z.ZodType<Prisma.ProductOptionDefaultArgs> = z.object({
  select: z.lazy(() => ProductOptionSelectSchema).optional(),
  include: z.lazy(() => ProductOptionIncludeSchema).optional(),
}).strict();

export const ProductOptionCountOutputTypeArgsSchema: z.ZodType<Prisma.ProductOptionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => ProductOptionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProductOptionCountOutputTypeSelectSchema: z.ZodType<Prisma.ProductOptionCountOutputTypeSelect> = z.object({
  purchaseOrders: z.boolean().optional(),
  sales: z.boolean().optional(),
}).strict();

export const ProductOptionSelectSchema: z.ZodType<Prisma.ProductOptionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  unitPrice: z.boolean().optional(),
  currency: z.boolean().optional(),
  importedFrom: z.boolean().optional(),
  inventoryQuantity: z.boolean().optional(),
  leadtime: z.boolean().optional(),
  status: z.boolean().optional(),
  location: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  productId: z.boolean().optional(),
  companyId: z.boolean().optional(),
  product: z.union([z.boolean(),z.lazy(() => ProductArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  purchaseOrders: z.union([z.boolean(),z.lazy(() => PurchaseOrderFindManyArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SaleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProductOptionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PURCHASE ORDER
//------------------------------------------------------

export const PurchaseOrderIncludeSchema: z.ZodType<Prisma.PurchaseOrderInclude> = z.object({
  productOption: z.union([z.boolean(),z.lazy(() => ProductOptionArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
}).strict()

export const PurchaseOrderArgsSchema: z.ZodType<Prisma.PurchaseOrderDefaultArgs> = z.object({
  select: z.lazy(() => PurchaseOrderSelectSchema).optional(),
  include: z.lazy(() => PurchaseOrderIncludeSchema).optional(),
}).strict();

export const PurchaseOrderSelectSchema: z.ZodType<Prisma.PurchaseOrderSelect> = z.object({
  id: z.boolean().optional(),
  orderedQuantity: z.boolean().optional(),
  orderedAt: z.boolean().optional(),
  receivedQuantity: z.boolean().optional(),
  receivedAt: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  productOptionId: z.boolean().optional(),
  companyId: z.boolean().optional(),
  productOption: z.union([z.boolean(),z.lazy(() => ProductOptionArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
}).strict()

// SALE
//------------------------------------------------------

export const SaleIncludeSchema: z.ZodType<Prisma.SaleInclude> = z.object({
  productOption: z.union([z.boolean(),z.lazy(() => ProductOptionArgsSchema)]).optional(),
  channel: z.union([z.boolean(),z.lazy(() => SalesChannelArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
}).strict()

export const SaleArgsSchema: z.ZodType<Prisma.SaleDefaultArgs> = z.object({
  select: z.lazy(() => SaleSelectSchema).optional(),
  include: z.lazy(() => SaleIncludeSchema).optional(),
}).strict();

export const SaleSelectSchema: z.ZodType<Prisma.SaleSelect> = z.object({
  id: z.boolean().optional(),
  quantity: z.boolean().optional(),
  soldAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  productOptionId: z.boolean().optional(),
  channelId: z.boolean().optional(),
  companyId: z.boolean().optional(),
  productOption: z.union([z.boolean(),z.lazy(() => ProductOptionArgsSchema)]).optional(),
  channel: z.union([z.boolean(),z.lazy(() => SalesChannelArgsSchema)]).optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
}).strict()

// SALES CHANNEL
//------------------------------------------------------

export const SalesChannelIncludeSchema: z.ZodType<Prisma.SalesChannelInclude> = z.object({
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SaleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SalesChannelCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const SalesChannelArgsSchema: z.ZodType<Prisma.SalesChannelDefaultArgs> = z.object({
  select: z.lazy(() => SalesChannelSelectSchema).optional(),
  include: z.lazy(() => SalesChannelIncludeSchema).optional(),
}).strict();

export const SalesChannelCountOutputTypeArgsSchema: z.ZodType<Prisma.SalesChannelCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => SalesChannelCountOutputTypeSelectSchema).nullish(),
}).strict();

export const SalesChannelCountOutputTypeSelectSchema: z.ZodType<Prisma.SalesChannelCountOutputTypeSelect> = z.object({
  sales: z.boolean().optional(),
}).strict();

export const SalesChannelSelectSchema: z.ZodType<Prisma.SalesChannelSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  url: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  companyId: z.boolean().optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  sales: z.union([z.boolean(),z.lazy(() => SaleFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => SalesChannelCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  company: z.union([ z.lazy(() => CompanyNullableRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.UserOrderByWithRelationAndSearchRelevanceInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  company: z.union([ z.lazy(() => CompanyNullableRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationAndSearchRelevanceInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  _relevance: z.lazy(() => AccountOrderByRelevanceInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
})
.and(z.object({
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationAndSearchRelevanceInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  _relevance: z.lazy(() => SessionOrderByRelevanceInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  sessionToken: z.string()
})
.and(z.object({
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  crn: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registeredAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  repName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  repMobile: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  certificateUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  productOptions: z.lazy(() => ProductOptionListRelationFilterSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderListRelationFilterSchema).optional(),
  sales: z.lazy(() => SaleListRelationFilterSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelListRelationFilterSchema).optional()
}).strict();

export const CompanyOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationAndSearchRelevanceInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  crn: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  registeredAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  repName: z.lazy(() => SortOrderSchema).optional(),
  repMobile: z.lazy(() => SortOrderSchema).optional(),
  certificateUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  users: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
  products: z.lazy(() => ProductOrderByRelationAggregateInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionOrderByRelationAggregateInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderOrderByRelationAggregateInputSchema).optional(),
  sales: z.lazy(() => SaleOrderByRelationAggregateInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => CompanyOrderByRelevanceInputSchema).optional()
}).strict();

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    crn: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    crn: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  crn: z.string().optional(),
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  registeredAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  repName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  repMobile: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  certificateUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  users: z.lazy(() => UserListRelationFilterSchema).optional(),
  products: z.lazy(() => ProductListRelationFilterSchema).optional(),
  productOptions: z.lazy(() => ProductOptionListRelationFilterSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderListRelationFilterSchema).optional(),
  sales: z.lazy(() => SaleListRelationFilterSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelListRelationFilterSchema).optional()
}).strict());

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  crn: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  registeredAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  repName: z.lazy(() => SortOrderSchema).optional(),
  repMobile: z.lazy(() => SortOrderSchema).optional(),
  certificateUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional()
}).strict();

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  crn: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  registeredAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  repName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  repMobile: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  certificateUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProductWhereInputSchema: z.ZodType<Prisma.ProductWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  purchaseAt: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  options: z.lazy(() => ProductOptionListRelationFilterSchema).optional()
}).strict();

export const ProductOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.ProductOrderByWithRelationAndSearchRelevanceInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  purchaseAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  options: z.lazy(() => ProductOptionOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => ProductOrderByRelevanceInputSchema).optional()
}).strict();

export const ProductWhereUniqueInputSchema: z.ZodType<Prisma.ProductWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductWhereInputSchema),z.lazy(() => ProductWhereInputSchema).array() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  purchaseAt: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  options: z.lazy(() => ProductOptionListRelationFilterSchema).optional()
}).strict());

export const ProductOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  purchaseAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProductScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  purchaseAt: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProductOptionWhereInputSchema: z.ZodType<Prisma.ProductOptionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductOptionWhereInputSchema),z.lazy(() => ProductOptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductOptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductOptionWhereInputSchema),z.lazy(() => ProductOptionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  currency: z.union([ z.lazy(() => EnumCurrencyFilterSchema),z.lazy(() => CurrencySchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => EnumCountryFilterSchema),z.lazy(() => CountrySchema) ]).optional(),
  inventoryQuantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  leadtime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumProductOptionStatusFilterSchema),z.lazy(() => ProductOptionStatusSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderListRelationFilterSchema).optional(),
  sales: z.lazy(() => SaleListRelationFilterSchema).optional()
}).strict();

export const ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.ProductOptionOrderByWithRelationAndSearchRelevanceInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  importedFrom: z.lazy(() => SortOrderSchema).optional(),
  inventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  leadtime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  product: z.lazy(() => ProductOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderOrderByRelationAggregateInputSchema).optional(),
  sales: z.lazy(() => SaleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => ProductOptionOrderByRelevanceInputSchema).optional()
}).strict();

export const ProductOptionWhereUniqueInputSchema: z.ZodType<Prisma.ProductOptionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => ProductOptionWhereInputSchema),z.lazy(() => ProductOptionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductOptionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductOptionWhereInputSchema),z.lazy(() => ProductOptionWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  currency: z.union([ z.lazy(() => EnumCurrencyFilterSchema),z.lazy(() => CurrencySchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => EnumCountryFilterSchema),z.lazy(() => CountrySchema) ]).optional(),
  inventoryQuantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  leadtime: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => EnumProductOptionStatusFilterSchema),z.lazy(() => ProductOptionStatusSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  product: z.union([ z.lazy(() => ProductRelationFilterSchema),z.lazy(() => ProductWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderListRelationFilterSchema).optional(),
  sales: z.lazy(() => SaleListRelationFilterSchema).optional()
}).strict());

export const ProductOptionOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProductOptionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  importedFrom: z.lazy(() => SortOrderSchema).optional(),
  inventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  leadtime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProductOptionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProductOptionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProductOptionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProductOptionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProductOptionSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProductOptionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProductOptionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProductOptionScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductOptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductOptionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductOptionScalarWhereWithAggregatesInputSchema),z.lazy(() => ProductOptionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  unitPrice: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  currency: z.union([ z.lazy(() => EnumCurrencyWithAggregatesFilterSchema),z.lazy(() => CurrencySchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => EnumCountryWithAggregatesFilterSchema),z.lazy(() => CountrySchema) ]).optional(),
  inventoryQuantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  leadtime: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumProductOptionStatusWithAggregatesFilterSchema),z.lazy(() => ProductOptionStatusSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  productId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const PurchaseOrderWhereInputSchema: z.ZodType<Prisma.PurchaseOrderWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PurchaseOrderWhereInputSchema),z.lazy(() => PurchaseOrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PurchaseOrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PurchaseOrderWhereInputSchema),z.lazy(() => PurchaseOrderWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orderedQuantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  orderedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  receivedQuantity: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumPurchaseOrderStatusFilterSchema),z.lazy(() => PurchaseOrderStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productOption: z.union([ z.lazy(() => ProductOptionRelationFilterSchema),z.lazy(() => ProductOptionWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.PurchaseOrderOrderByWithRelationAndSearchRelevanceInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderedQuantity: z.lazy(() => SortOrderSchema).optional(),
  orderedAt: z.lazy(() => SortOrderSchema).optional(),
  receivedQuantity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  receivedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  productOption: z.lazy(() => ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  _relevance: z.lazy(() => PurchaseOrderOrderByRelevanceInputSchema).optional()
}).strict();

export const PurchaseOrderWhereUniqueInputSchema: z.ZodType<Prisma.PurchaseOrderWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PurchaseOrderWhereInputSchema),z.lazy(() => PurchaseOrderWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PurchaseOrderWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PurchaseOrderWhereInputSchema),z.lazy(() => PurchaseOrderWhereInputSchema).array() ]).optional(),
  orderedQuantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  orderedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  receivedQuantity: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumPurchaseOrderStatusFilterSchema),z.lazy(() => PurchaseOrderStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productOption: z.union([ z.lazy(() => ProductOptionRelationFilterSchema),z.lazy(() => ProductOptionWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
}).strict());

export const PurchaseOrderOrderByWithAggregationInputSchema: z.ZodType<Prisma.PurchaseOrderOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderedQuantity: z.lazy(() => SortOrderSchema).optional(),
  orderedAt: z.lazy(() => SortOrderSchema).optional(),
  receivedQuantity: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  receivedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PurchaseOrderCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PurchaseOrderAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PurchaseOrderMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PurchaseOrderMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PurchaseOrderSumOrderByAggregateInputSchema).optional()
}).strict();

export const PurchaseOrderScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PurchaseOrderScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema),z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema),z.lazy(() => PurchaseOrderScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  orderedQuantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  orderedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  receivedQuantity: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumPurchaseOrderStatusWithAggregatesFilterSchema),z.lazy(() => PurchaseOrderStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  productOptionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SaleWhereInputSchema: z.ZodType<Prisma.SaleWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SaleWhereInputSchema),z.lazy(() => SaleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SaleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SaleWhereInputSchema),z.lazy(() => SaleWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  soldAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productOption: z.union([ z.lazy(() => ProductOptionRelationFilterSchema),z.lazy(() => ProductOptionWhereInputSchema) ]).optional(),
  channel: z.union([ z.lazy(() => SalesChannelRelationFilterSchema),z.lazy(() => SalesChannelWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
}).strict();

export const SaleOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.SaleOrderByWithRelationAndSearchRelevanceInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  soldAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  productOption: z.lazy(() => ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  channel: z.lazy(() => SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  _relevance: z.lazy(() => SaleOrderByRelevanceInputSchema).optional()
}).strict();

export const SaleWhereUniqueInputSchema: z.ZodType<Prisma.SaleWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SaleWhereInputSchema),z.lazy(() => SaleWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SaleWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SaleWhereInputSchema),z.lazy(() => SaleWhereInputSchema).array() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  soldAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  productOption: z.union([ z.lazy(() => ProductOptionRelationFilterSchema),z.lazy(() => ProductOptionWhereInputSchema) ]).optional(),
  channel: z.union([ z.lazy(() => SalesChannelRelationFilterSchema),z.lazy(() => SalesChannelWhereInputSchema) ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
}).strict());

export const SaleOrderByWithAggregationInputSchema: z.ZodType<Prisma.SaleOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  soldAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SaleCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SaleAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SaleMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SaleMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SaleSumOrderByAggregateInputSchema).optional()
}).strict();

export const SaleScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SaleScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SaleScalarWhereWithAggregatesInputSchema),z.lazy(() => SaleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SaleScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SaleScalarWhereWithAggregatesInputSchema),z.lazy(() => SaleScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  soldAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  productOptionId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const SalesChannelWhereInputSchema: z.ZodType<Prisma.SalesChannelWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SalesChannelWhereInputSchema),z.lazy(() => SalesChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesChannelWhereInputSchema),z.lazy(() => SalesChannelWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  sales: z.lazy(() => SaleListRelationFilterSchema).optional()
}).strict();

export const SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema: z.ZodType<Prisma.SalesChannelOrderByWithRelationAndSearchRelevanceInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationAndSearchRelevanceInputSchema).optional(),
  sales: z.lazy(() => SaleOrderByRelationAggregateInputSchema).optional(),
  _relevance: z.lazy(() => SalesChannelOrderByRelevanceInputSchema).optional()
}).strict();

export const SalesChannelWhereUniqueInputSchema: z.ZodType<Prisma.SalesChannelWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => SalesChannelWhereInputSchema),z.lazy(() => SalesChannelWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesChannelWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesChannelWhereInputSchema),z.lazy(() => SalesChannelWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  sales: z.lazy(() => SaleListRelationFilterSchema).optional()
}).strict());

export const SalesChannelOrderByWithAggregationInputSchema: z.ZodType<Prisma.SalesChannelOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SalesChannelCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SalesChannelMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SalesChannelMinOrderByAggregateInputSchema).optional()
}).strict();

export const SalesChannelScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SalesChannelScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SalesChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesChannelScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesChannelScalarWhereWithAggregatesInputSchema),z.lazy(() => SalesChannelScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductCreateInputSchema: z.ZodType<Prisma.ProductCreateInput> = z.object({
  id: z.string().cuid().optional(),
  code: z.string().optional().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutProductsInputSchema),
  options: z.lazy(() => ProductOptionCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateInputSchema: z.ZodType<Prisma.ProductUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  code: z.string().optional().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string(),
  options: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUpdateInputSchema: z.ZodType<Prisma.ProductUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutProductsNestedInputSchema).optional(),
  options: z.lazy(() => ProductOptionUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductCreateManyInputSchema: z.ZodType<Prisma.ProductCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  code: z.string().optional().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string()
}).strict();

export const ProductUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductOptionCreateInputSchema: z.ZodType<Prisma.ProductOptionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOptionsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutProductOptionsInputSchema),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutProductOptionInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionUncheckedCreateInputSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string(),
  companyId: z.string(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutProductOptionInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionUpdateInputSchema: z.ZodType<Prisma.ProductOptionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOptionsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutProductOptionsNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutProductOptionNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const ProductOptionUncheckedUpdateInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutProductOptionNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const ProductOptionCreateManyInputSchema: z.ZodType<Prisma.ProductOptionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string(),
  companyId: z.string()
}).strict();

export const ProductOptionUpdateManyMutationInputSchema: z.ZodType<Prisma.ProductOptionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductOptionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderCreateInputSchema: z.ZodType<Prisma.PurchaseOrderCreateInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOption: z.lazy(() => ProductOptionCreateNestedOneWithoutPurchaseOrdersInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutPurchaseOrdersInputSchema)
}).strict();

export const PurchaseOrderUncheckedCreateInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string(),
  companyId: z.string()
}).strict();

export const PurchaseOrderUpdateInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOption: z.lazy(() => ProductOptionUpdateOneRequiredWithoutPurchaseOrdersNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutPurchaseOrdersNestedInputSchema).optional()
}).strict();

export const PurchaseOrderUncheckedUpdateInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderCreateManyInputSchema: z.ZodType<Prisma.PurchaseOrderCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string(),
  companyId: z.string()
}).strict();

export const PurchaseOrderUpdateManyMutationInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleCreateInputSchema: z.ZodType<Prisma.SaleCreateInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOption: z.lazy(() => ProductOptionCreateNestedOneWithoutSalesInputSchema),
  channel: z.lazy(() => SalesChannelCreateNestedOneWithoutSalesInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutSalesInputSchema)
}).strict();

export const SaleUncheckedCreateInputSchema: z.ZodType<Prisma.SaleUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string(),
  channelId: z.string(),
  companyId: z.string()
}).strict();

export const SaleUpdateInputSchema: z.ZodType<Prisma.SaleUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOption: z.lazy(() => ProductOptionUpdateOneRequiredWithoutSalesNestedInputSchema).optional(),
  channel: z.lazy(() => SalesChannelUpdateOneRequiredWithoutSalesNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutSalesNestedInputSchema).optional()
}).strict();

export const SaleUncheckedUpdateInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleCreateManyInputSchema: z.ZodType<Prisma.SaleCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string(),
  channelId: z.string(),
  companyId: z.string()
}).strict();

export const SaleUpdateManyMutationInputSchema: z.ZodType<Prisma.SaleUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesChannelCreateInputSchema: z.ZodType<Prisma.SalesChannelCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutSalesChannelsInputSchema),
  sales: z.lazy(() => SaleCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const SalesChannelUncheckedCreateInputSchema: z.ZodType<Prisma.SalesChannelUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const SalesChannelUpdateInputSchema: z.ZodType<Prisma.SalesChannelUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutSalesChannelsNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const SalesChannelUncheckedUpdateInputSchema: z.ZodType<Prisma.SalesChannelUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const SalesChannelCreateManyInputSchema: z.ZodType<Prisma.SalesChannelCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string()
}).strict();

export const SalesChannelUpdateManyMutationInputSchema: z.ZodType<Prisma.SalesChannelUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesChannelUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SalesChannelUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const CompanyNullableRelationFilterSchema: z.ZodType<Prisma.CompanyNullableRelationFilter> = z.object({
  is: z.lazy(() => CompanyWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional().nullable()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => UserOrderByRelevanceFieldEnumSchema),z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelevanceInputSchema: z.ZodType<Prisma.AccountOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => AccountOrderByRelevanceFieldEnumSchema),z.lazy(() => AccountOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.lazy(() => SortOrderSchema).optional(),
  access_token: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional(),
  token_type: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  id_token: z.lazy(() => SortOrderSchema).optional(),
  session_state: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const SessionOrderByRelevanceInputSchema: z.ZodType<Prisma.SessionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => SessionOrderByRelevanceFieldEnumSchema),z.lazy(() => SessionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ProductListRelationFilterSchema: z.ZodType<Prisma.ProductListRelationFilter> = z.object({
  every: z.lazy(() => ProductWhereInputSchema).optional(),
  some: z.lazy(() => ProductWhereInputSchema).optional(),
  none: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductOptionListRelationFilterSchema: z.ZodType<Prisma.ProductOptionListRelationFilter> = z.object({
  every: z.lazy(() => ProductOptionWhereInputSchema).optional(),
  some: z.lazy(() => ProductOptionWhereInputSchema).optional(),
  none: z.lazy(() => ProductOptionWhereInputSchema).optional()
}).strict();

export const PurchaseOrderListRelationFilterSchema: z.ZodType<Prisma.PurchaseOrderListRelationFilter> = z.object({
  every: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
  some: z.lazy(() => PurchaseOrderWhereInputSchema).optional(),
  none: z.lazy(() => PurchaseOrderWhereInputSchema).optional()
}).strict();

export const SaleListRelationFilterSchema: z.ZodType<Prisma.SaleListRelationFilter> = z.object({
  every: z.lazy(() => SaleWhereInputSchema).optional(),
  some: z.lazy(() => SaleWhereInputSchema).optional(),
  none: z.lazy(() => SaleWhereInputSchema).optional()
}).strict();

export const SalesChannelListRelationFilterSchema: z.ZodType<Prisma.SalesChannelListRelationFilter> = z.object({
  every: z.lazy(() => SalesChannelWhereInputSchema).optional(),
  some: z.lazy(() => SalesChannelWhereInputSchema).optional(),
  none: z.lazy(() => SalesChannelWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductOptionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProductOptionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PurchaseOrderOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PurchaseOrderOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SaleOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SaleOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesChannelOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SalesChannelOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyOrderByRelevanceInputSchema: z.ZodType<Prisma.CompanyOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => CompanyOrderByRelevanceFieldEnumSchema),z.lazy(() => CompanyOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  crn: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  registeredAt: z.lazy(() => SortOrderSchema).optional(),
  repName: z.lazy(() => SortOrderSchema).optional(),
  repMobile: z.lazy(() => SortOrderSchema).optional(),
  certificateUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  crn: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  registeredAt: z.lazy(() => SortOrderSchema).optional(),
  repName: z.lazy(() => SortOrderSchema).optional(),
  repMobile: z.lazy(() => SortOrderSchema).optional(),
  certificateUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  crn: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  registeredAt: z.lazy(() => SortOrderSchema).optional(),
  repName: z.lazy(() => SortOrderSchema).optional(),
  repMobile: z.lazy(() => SortOrderSchema).optional(),
  certificateUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyRelationFilterSchema: z.ZodType<Prisma.CompanyRelationFilter> = z.object({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const ProductOrderByRelevanceInputSchema: z.ZodType<Prisma.ProductOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ProductOrderByRelevanceFieldEnumSchema),z.lazy(() => ProductOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ProductCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  purchaseAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  purchaseAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  code: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  purchaseAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const EnumCurrencyFilterSchema: z.ZodType<Prisma.EnumCurrencyFilter> = z.object({
  equals: z.lazy(() => CurrencySchema).optional(),
  in: z.lazy(() => CurrencySchema).array().optional(),
  notIn: z.lazy(() => CurrencySchema).array().optional(),
  not: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => NestedEnumCurrencyFilterSchema) ]).optional(),
}).strict();

export const EnumCountryFilterSchema: z.ZodType<Prisma.EnumCountryFilter> = z.object({
  equals: z.lazy(() => CountrySchema).optional(),
  in: z.lazy(() => CountrySchema).array().optional(),
  notIn: z.lazy(() => CountrySchema).array().optional(),
  not: z.union([ z.lazy(() => CountrySchema),z.lazy(() => NestedEnumCountryFilterSchema) ]).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const EnumProductOptionStatusFilterSchema: z.ZodType<Prisma.EnumProductOptionStatusFilter> = z.object({
  equals: z.lazy(() => ProductOptionStatusSchema).optional(),
  in: z.lazy(() => ProductOptionStatusSchema).array().optional(),
  notIn: z.lazy(() => ProductOptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => NestedEnumProductOptionStatusFilterSchema) ]).optional(),
}).strict();

export const ProductRelationFilterSchema: z.ZodType<Prisma.ProductRelationFilter> = z.object({
  is: z.lazy(() => ProductWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductOptionOrderByRelevanceInputSchema: z.ZodType<Prisma.ProductOptionOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => ProductOptionOrderByRelevanceFieldEnumSchema),z.lazy(() => ProductOptionOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const ProductOptionCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProductOptionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  importedFrom: z.lazy(() => SortOrderSchema).optional(),
  inventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  leadtime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductOptionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProductOptionAvgOrderByAggregateInput> = z.object({
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  inventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  leadtime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductOptionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProductOptionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  importedFrom: z.lazy(() => SortOrderSchema).optional(),
  inventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  leadtime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductOptionMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProductOptionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  importedFrom: z.lazy(() => SortOrderSchema).optional(),
  inventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  leadtime: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProductOptionSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProductOptionSumOrderByAggregateInput> = z.object({
  unitPrice: z.lazy(() => SortOrderSchema).optional(),
  inventoryQuantity: z.lazy(() => SortOrderSchema).optional(),
  leadtime: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const EnumCurrencyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCurrencyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CurrencySchema).optional(),
  in: z.lazy(() => CurrencySchema).array().optional(),
  notIn: z.lazy(() => CurrencySchema).array().optional(),
  not: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => NestedEnumCurrencyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCurrencyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCurrencyFilterSchema).optional()
}).strict();

export const EnumCountryWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCountryWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CountrySchema).optional(),
  in: z.lazy(() => CountrySchema).array().optional(),
  notIn: z.lazy(() => CountrySchema).array().optional(),
  not: z.union([ z.lazy(() => CountrySchema),z.lazy(() => NestedEnumCountryWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCountryFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCountryFilterSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumProductOptionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumProductOptionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ProductOptionStatusSchema).optional(),
  in: z.lazy(() => ProductOptionStatusSchema).array().optional(),
  notIn: z.lazy(() => ProductOptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => NestedEnumProductOptionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumProductOptionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumProductOptionStatusFilterSchema).optional()
}).strict();

export const EnumPurchaseOrderStatusFilterSchema: z.ZodType<Prisma.EnumPurchaseOrderStatusFilter> = z.object({
  equals: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  in: z.lazy(() => PurchaseOrderStatusSchema).array().optional(),
  notIn: z.lazy(() => PurchaseOrderStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => NestedEnumPurchaseOrderStatusFilterSchema) ]).optional(),
}).strict();

export const ProductOptionRelationFilterSchema: z.ZodType<Prisma.ProductOptionRelationFilter> = z.object({
  is: z.lazy(() => ProductOptionWhereInputSchema).optional(),
  isNot: z.lazy(() => ProductOptionWhereInputSchema).optional()
}).strict();

export const PurchaseOrderOrderByRelevanceInputSchema: z.ZodType<Prisma.PurchaseOrderOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => PurchaseOrderOrderByRelevanceFieldEnumSchema),z.lazy(() => PurchaseOrderOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const PurchaseOrderCountOrderByAggregateInputSchema: z.ZodType<Prisma.PurchaseOrderCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderedQuantity: z.lazy(() => SortOrderSchema).optional(),
  orderedAt: z.lazy(() => SortOrderSchema).optional(),
  receivedQuantity: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PurchaseOrderAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PurchaseOrderAvgOrderByAggregateInput> = z.object({
  orderedQuantity: z.lazy(() => SortOrderSchema).optional(),
  receivedQuantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PurchaseOrderMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PurchaseOrderMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderedQuantity: z.lazy(() => SortOrderSchema).optional(),
  orderedAt: z.lazy(() => SortOrderSchema).optional(),
  receivedQuantity: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PurchaseOrderMinOrderByAggregateInputSchema: z.ZodType<Prisma.PurchaseOrderMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  orderedQuantity: z.lazy(() => SortOrderSchema).optional(),
  orderedAt: z.lazy(() => SortOrderSchema).optional(),
  receivedQuantity: z.lazy(() => SortOrderSchema).optional(),
  receivedAt: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PurchaseOrderSumOrderByAggregateInputSchema: z.ZodType<Prisma.PurchaseOrderSumOrderByAggregateInput> = z.object({
  orderedQuantity: z.lazy(() => SortOrderSchema).optional(),
  receivedQuantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPurchaseOrderStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPurchaseOrderStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  in: z.lazy(() => PurchaseOrderStatusSchema).array().optional(),
  notIn: z.lazy(() => PurchaseOrderStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => NestedEnumPurchaseOrderStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPurchaseOrderStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPurchaseOrderStatusFilterSchema).optional()
}).strict();

export const SalesChannelRelationFilterSchema: z.ZodType<Prisma.SalesChannelRelationFilter> = z.object({
  is: z.lazy(() => SalesChannelWhereInputSchema).optional(),
  isNot: z.lazy(() => SalesChannelWhereInputSchema).optional()
}).strict();

export const SaleOrderByRelevanceInputSchema: z.ZodType<Prisma.SaleOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => SaleOrderByRelevanceFieldEnumSchema),z.lazy(() => SaleOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const SaleCountOrderByAggregateInputSchema: z.ZodType<Prisma.SaleCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  soldAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SaleAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SaleAvgOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SaleMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SaleMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  soldAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SaleMinOrderByAggregateInputSchema: z.ZodType<Prisma.SaleMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  soldAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  productOptionId: z.lazy(() => SortOrderSchema).optional(),
  channelId: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SaleSumOrderByAggregateInputSchema: z.ZodType<Prisma.SaleSumOrderByAggregateInput> = z.object({
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesChannelOrderByRelevanceInputSchema: z.ZodType<Prisma.SalesChannelOrderByRelevanceInput> = z.object({
  fields: z.union([ z.lazy(() => SalesChannelOrderByRelevanceFieldEnumSchema),z.lazy(() => SalesChannelOrderByRelevanceFieldEnumSchema).array() ]),
  sort: z.lazy(() => SortOrderSchema),
  search: z.string()
}).strict();

export const SalesChannelCountOrderByAggregateInputSchema: z.ZodType<Prisma.SalesChannelCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesChannelMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SalesChannelMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SalesChannelMinOrderByAggregateInputSchema: z.ZodType<Prisma.SalesChannelMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const CompanyUpdateOneWithoutUsersNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutUsersInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => CompanyUpdateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema),z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.ProductCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCompanyInputSchema),z.lazy(() => ProductCreateWithoutCompanyInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductOptionCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema).array(),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductOptionCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ProductOptionCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PurchaseOrderCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema).array(),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PurchaseOrderCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SaleCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.SaleCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutCompanyInputSchema),z.lazy(() => SaleCreateWithoutCompanyInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SaleCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SalesChannelCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema).array(),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SalesChannelCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SalesChannelCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SalesChannelCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema),z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.ProductUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCompanyInputSchema),z.lazy(() => ProductCreateWithoutCompanyInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductOptionUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema).array(),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductOptionCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ProductOptionCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema).array(),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PurchaseOrderCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SaleUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.SaleUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutCompanyInputSchema),z.lazy(() => SaleCreateWithoutCompanyInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SaleCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SalesChannelUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema).array(),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SalesChannelCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SalesChannelCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SalesChannelCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema),z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.ProductUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCompanyInputSchema),z.lazy(() => ProductCreateWithoutCompanyInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductOptionUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.ProductOptionUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema).array(),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductOptionCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ProductOptionCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductOptionUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => ProductOptionUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductOptionScalarWhereInputSchema),z.lazy(() => ProductOptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PurchaseOrderUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema).array(),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PurchaseOrderCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PurchaseOrderScalarWhereInputSchema),z.lazy(() => PurchaseOrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SaleUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.SaleUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutCompanyInputSchema),z.lazy(() => SaleCreateWithoutCompanyInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SaleCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SaleUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SaleUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SaleUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SaleUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SaleUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => SaleUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SaleScalarWhereInputSchema),z.lazy(() => SaleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SalesChannelUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.SalesChannelUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema).array(),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SalesChannelCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SalesChannelCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SalesChannelUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SalesChannelUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SalesChannelCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SalesChannelUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SalesChannelUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SalesChannelUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => SalesChannelUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SalesChannelScalarWhereInputSchema),z.lazy(() => SalesChannelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema),z.lazy(() => UserCreateWithoutCompanyInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => UserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutCompanyInputSchema),z.lazy(() => ProductCreateWithoutCompanyInputSchema).array(),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ProductCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ProductUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductWhereUniqueInputSchema),z.lazy(() => ProductWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ProductUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => ProductUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductOptionUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema).array(),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductOptionCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ProductOptionCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductOptionUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => ProductOptionUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductOptionScalarWhereInputSchema),z.lazy(() => ProductOptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema).array(),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PurchaseOrderCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PurchaseOrderScalarWhereInputSchema),z.lazy(() => PurchaseOrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SaleUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutCompanyInputSchema),z.lazy(() => SaleCreateWithoutCompanyInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SaleCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SaleUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SaleUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SaleUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SaleUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SaleUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => SaleUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SaleScalarWhereInputSchema),z.lazy(() => SaleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SalesChannelUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.SalesChannelUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema).array(),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SalesChannelCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => SalesChannelCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SalesChannelUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SalesChannelUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SalesChannelCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SalesChannelWhereUniqueInputSchema),z.lazy(() => SalesChannelWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SalesChannelUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => SalesChannelUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SalesChannelUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => SalesChannelUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SalesChannelScalarWhereInputSchema),z.lazy(() => SalesChannelScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyCreateNestedOneWithoutProductsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutProductsInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutProductsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const ProductOptionCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutProductInputSchema),z.lazy(() => ProductOptionCreateWithoutProductInputSchema).array(),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputSchema),z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProductOptionUncheckedCreateNestedManyWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateNestedManyWithoutProductInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutProductInputSchema),z.lazy(() => ProductOptionCreateWithoutProductInputSchema).array(),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputSchema),z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyProductInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutProductsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutProductsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutProductsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutProductsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutProductsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutProductsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutProductsInputSchema),z.lazy(() => CompanyUpdateWithoutProductsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutProductsInputSchema) ]).optional(),
}).strict();

export const ProductOptionUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductOptionUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutProductInputSchema),z.lazy(() => ProductOptionCreateWithoutProductInputSchema).array(),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputSchema),z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductOptionUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => ProductOptionUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductOptionScalarWhereInputSchema),z.lazy(() => ProductOptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductOptionUncheckedUpdateManyWithoutProductNestedInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateManyWithoutProductNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutProductInputSchema),z.lazy(() => ProductOptionCreateWithoutProductInputSchema).array(),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputSchema),z.lazy(() => ProductOptionCreateOrConnectWithoutProductInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ProductOptionUpsertWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProductOptionCreateManyProductInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProductOptionWhereUniqueInputSchema),z.lazy(() => ProductOptionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutProductInputSchema),z.lazy(() => ProductOptionUpdateWithWhereUniqueWithoutProductInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProductOptionUpdateManyWithWhereWithoutProductInputSchema),z.lazy(() => ProductOptionUpdateManyWithWhereWithoutProductInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProductOptionScalarWhereInputSchema),z.lazy(() => ProductOptionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductCreateNestedOneWithoutOptionsInputSchema: z.ZodType<Prisma.ProductCreateNestedOneWithoutOptionsInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutOptionsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOptionsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional()
}).strict();

export const CompanyCreateNestedOneWithoutProductOptionsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutProductOptionsInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutProductOptionsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutProductOptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutProductOptionsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const PurchaseOrderCreateNestedManyWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderCreateNestedManyWithoutProductOptionInput> = z.object({
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema).array(),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyProductOptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SaleCreateNestedManyWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleCreateNestedManyWithoutProductOptionInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutProductOptionInputSchema),z.lazy(() => SaleCreateWithoutProductOptionInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutProductOptionInputSchema),z.lazy(() => SaleCreateOrConnectWithoutProductOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyProductOptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PurchaseOrderUncheckedCreateNestedManyWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedCreateNestedManyWithoutProductOptionInput> = z.object({
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema).array(),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyProductOptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SaleUncheckedCreateNestedManyWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleUncheckedCreateNestedManyWithoutProductOptionInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutProductOptionInputSchema),z.lazy(() => SaleCreateWithoutProductOptionInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutProductOptionInputSchema),z.lazy(() => SaleCreateOrConnectWithoutProductOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyProductOptionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumCurrencyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCurrencyFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CurrencySchema).optional()
}).strict();

export const EnumCountryFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCountryFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CountrySchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumProductOptionStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumProductOptionStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ProductOptionStatusSchema).optional()
}).strict();

export const ProductUpdateOneRequiredWithoutOptionsNestedInputSchema: z.ZodType<Prisma.ProductUpdateOneRequiredWithoutOptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductCreateWithoutOptionsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductCreateOrConnectWithoutOptionsInputSchema).optional(),
  upsert: z.lazy(() => ProductUpsertWithoutOptionsInputSchema).optional(),
  connect: z.lazy(() => ProductWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductUpdateToOneWithWhereWithoutOptionsInputSchema),z.lazy(() => ProductUpdateWithoutOptionsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutOptionsInputSchema) ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutProductOptionsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutProductOptionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutProductOptionsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutProductOptionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutProductOptionsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutProductOptionsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutProductOptionsInputSchema),z.lazy(() => CompanyUpdateWithoutProductOptionsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutProductOptionsInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderUpdateManyWithoutProductOptionNestedInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateManyWithoutProductOptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema).array(),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutProductOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyProductOptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutProductOptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutProductOptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PurchaseOrderScalarWhereInputSchema),z.lazy(() => PurchaseOrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SaleUpdateManyWithoutProductOptionNestedInputSchema: z.ZodType<Prisma.SaleUpdateManyWithoutProductOptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutProductOptionInputSchema),z.lazy(() => SaleCreateWithoutProductOptionInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutProductOptionInputSchema),z.lazy(() => SaleCreateOrConnectWithoutProductOptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SaleUpsertWithWhereUniqueWithoutProductOptionInputSchema),z.lazy(() => SaleUpsertWithWhereUniqueWithoutProductOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyProductOptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SaleUpdateWithWhereUniqueWithoutProductOptionInputSchema),z.lazy(() => SaleUpdateWithWhereUniqueWithoutProductOptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SaleUpdateManyWithWhereWithoutProductOptionInputSchema),z.lazy(() => SaleUpdateManyWithWhereWithoutProductOptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SaleScalarWhereInputSchema),z.lazy(() => SaleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyWithoutProductOptionNestedInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedUpdateManyWithoutProductOptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema).array(),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUpsertWithWhereUniqueWithoutProductOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PurchaseOrderCreateManyProductOptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PurchaseOrderWhereUniqueInputSchema),z.lazy(() => PurchaseOrderWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUpdateWithWhereUniqueWithoutProductOptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUpdateManyWithWhereWithoutProductOptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PurchaseOrderScalarWhereInputSchema),z.lazy(() => PurchaseOrderScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SaleUncheckedUpdateManyWithoutProductOptionNestedInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateManyWithoutProductOptionNestedInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutProductOptionInputSchema),z.lazy(() => SaleCreateWithoutProductOptionInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutProductOptionInputSchema),z.lazy(() => SaleCreateOrConnectWithoutProductOptionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SaleUpsertWithWhereUniqueWithoutProductOptionInputSchema),z.lazy(() => SaleUpsertWithWhereUniqueWithoutProductOptionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyProductOptionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SaleUpdateWithWhereUniqueWithoutProductOptionInputSchema),z.lazy(() => SaleUpdateWithWhereUniqueWithoutProductOptionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SaleUpdateManyWithWhereWithoutProductOptionInputSchema),z.lazy(() => SaleUpdateManyWithWhereWithoutProductOptionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SaleScalarWhereInputSchema),z.lazy(() => SaleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProductOptionCreateNestedOneWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.ProductOptionCreateNestedOneWithoutPurchaseOrdersInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutPurchaseOrdersInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutPurchaseOrdersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductOptionCreateOrConnectWithoutPurchaseOrdersInputSchema).optional(),
  connect: z.lazy(() => ProductOptionWhereUniqueInputSchema).optional()
}).strict();

export const CompanyCreateNestedOneWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutPurchaseOrdersInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutPurchaseOrdersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutPurchaseOrdersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutPurchaseOrdersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPurchaseOrderStatusFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PurchaseOrderStatusSchema).optional()
}).strict();

export const ProductOptionUpdateOneRequiredWithoutPurchaseOrdersNestedInputSchema: z.ZodType<Prisma.ProductOptionUpdateOneRequiredWithoutPurchaseOrdersNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutPurchaseOrdersInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutPurchaseOrdersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductOptionCreateOrConnectWithoutPurchaseOrdersInputSchema).optional(),
  upsert: z.lazy(() => ProductOptionUpsertWithoutPurchaseOrdersInputSchema).optional(),
  connect: z.lazy(() => ProductOptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductOptionUpdateToOneWithWhereWithoutPurchaseOrdersInputSchema),z.lazy(() => ProductOptionUpdateWithoutPurchaseOrdersInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutPurchaseOrdersInputSchema) ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutPurchaseOrdersNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutPurchaseOrdersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutPurchaseOrdersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutPurchaseOrdersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutPurchaseOrdersInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutPurchaseOrdersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutPurchaseOrdersInputSchema),z.lazy(() => CompanyUpdateWithoutPurchaseOrdersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutPurchaseOrdersInputSchema) ]).optional(),
}).strict();

export const ProductOptionCreateNestedOneWithoutSalesInputSchema: z.ZodType<Prisma.ProductOptionCreateNestedOneWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutSalesInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutSalesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductOptionCreateOrConnectWithoutSalesInputSchema).optional(),
  connect: z.lazy(() => ProductOptionWhereUniqueInputSchema).optional()
}).strict();

export const SalesChannelCreateNestedOneWithoutSalesInputSchema: z.ZodType<Prisma.SalesChannelCreateNestedOneWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutSalesInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutSalesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesChannelCreateOrConnectWithoutSalesInputSchema).optional(),
  connect: z.lazy(() => SalesChannelWhereUniqueInputSchema).optional()
}).strict();

export const CompanyCreateNestedOneWithoutSalesInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutSalesInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutSalesInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSalesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutSalesInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const ProductOptionUpdateOneRequiredWithoutSalesNestedInputSchema: z.ZodType<Prisma.ProductOptionUpdateOneRequiredWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutSalesInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutSalesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProductOptionCreateOrConnectWithoutSalesInputSchema).optional(),
  upsert: z.lazy(() => ProductOptionUpsertWithoutSalesInputSchema).optional(),
  connect: z.lazy(() => ProductOptionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProductOptionUpdateToOneWithWhereWithoutSalesInputSchema),z.lazy(() => ProductOptionUpdateWithoutSalesInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutSalesInputSchema) ]).optional(),
}).strict();

export const SalesChannelUpdateOneRequiredWithoutSalesNestedInputSchema: z.ZodType<Prisma.SalesChannelUpdateOneRequiredWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutSalesInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutSalesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => SalesChannelCreateOrConnectWithoutSalesInputSchema).optional(),
  upsert: z.lazy(() => SalesChannelUpsertWithoutSalesInputSchema).optional(),
  connect: z.lazy(() => SalesChannelWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => SalesChannelUpdateToOneWithWhereWithoutSalesInputSchema),z.lazy(() => SalesChannelUpdateWithoutSalesInputSchema),z.lazy(() => SalesChannelUncheckedUpdateWithoutSalesInputSchema) ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutSalesNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutSalesNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutSalesInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSalesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutSalesInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutSalesInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutSalesInputSchema),z.lazy(() => CompanyUpdateWithoutSalesInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSalesInputSchema) ]).optional(),
}).strict();

export const CompanyCreateNestedOneWithoutSalesChannelsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutSalesChannelsInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutSalesChannelsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSalesChannelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutSalesChannelsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const SaleCreateNestedManyWithoutChannelInputSchema: z.ZodType<Prisma.SaleCreateNestedManyWithoutChannelInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutChannelInputSchema),z.lazy(() => SaleCreateWithoutChannelInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutChannelInputSchema),z.lazy(() => SaleCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyChannelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SaleUncheckedCreateNestedManyWithoutChannelInputSchema: z.ZodType<Prisma.SaleUncheckedCreateNestedManyWithoutChannelInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutChannelInputSchema),z.lazy(() => SaleCreateWithoutChannelInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutChannelInputSchema),z.lazy(() => SaleCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyChannelInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyUpdateOneRequiredWithoutSalesChannelsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutSalesChannelsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutSalesChannelsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSalesChannelsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutSalesChannelsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutSalesChannelsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutSalesChannelsInputSchema),z.lazy(() => CompanyUpdateWithoutSalesChannelsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSalesChannelsInputSchema) ]).optional(),
}).strict();

export const SaleUpdateManyWithoutChannelNestedInputSchema: z.ZodType<Prisma.SaleUpdateManyWithoutChannelNestedInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutChannelInputSchema),z.lazy(() => SaleCreateWithoutChannelInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutChannelInputSchema),z.lazy(() => SaleCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SaleUpsertWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => SaleUpsertWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyChannelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SaleUpdateWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => SaleUpdateWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SaleUpdateManyWithWhereWithoutChannelInputSchema),z.lazy(() => SaleUpdateManyWithWhereWithoutChannelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SaleScalarWhereInputSchema),z.lazy(() => SaleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SaleUncheckedUpdateManyWithoutChannelNestedInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateManyWithoutChannelNestedInput> = z.object({
  create: z.union([ z.lazy(() => SaleCreateWithoutChannelInputSchema),z.lazy(() => SaleCreateWithoutChannelInputSchema).array(),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SaleCreateOrConnectWithoutChannelInputSchema),z.lazy(() => SaleCreateOrConnectWithoutChannelInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SaleUpsertWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => SaleUpsertWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SaleCreateManyChannelInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SaleWhereUniqueInputSchema),z.lazy(() => SaleWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SaleUpdateWithWhereUniqueWithoutChannelInputSchema),z.lazy(() => SaleUpdateWithWhereUniqueWithoutChannelInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SaleUpdateManyWithWhereWithoutChannelInputSchema),z.lazy(() => SaleUpdateManyWithWhereWithoutChannelInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SaleScalarWhereInputSchema),z.lazy(() => SaleScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  search: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCurrencyFilterSchema: z.ZodType<Prisma.NestedEnumCurrencyFilter> = z.object({
  equals: z.lazy(() => CurrencySchema).optional(),
  in: z.lazy(() => CurrencySchema).array().optional(),
  notIn: z.lazy(() => CurrencySchema).array().optional(),
  not: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => NestedEnumCurrencyFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCountryFilterSchema: z.ZodType<Prisma.NestedEnumCountryFilter> = z.object({
  equals: z.lazy(() => CountrySchema).optional(),
  in: z.lazy(() => CountrySchema).array().optional(),
  notIn: z.lazy(() => CountrySchema).array().optional(),
  not: z.union([ z.lazy(() => CountrySchema),z.lazy(() => NestedEnumCountryFilterSchema) ]).optional(),
}).strict();

export const NestedEnumProductOptionStatusFilterSchema: z.ZodType<Prisma.NestedEnumProductOptionStatusFilter> = z.object({
  equals: z.lazy(() => ProductOptionStatusSchema).optional(),
  in: z.lazy(() => ProductOptionStatusSchema).array().optional(),
  notIn: z.lazy(() => ProductOptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => NestedEnumProductOptionStatusFilterSchema) ]).optional(),
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumCurrencyWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCurrencyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CurrencySchema).optional(),
  in: z.lazy(() => CurrencySchema).array().optional(),
  notIn: z.lazy(() => CurrencySchema).array().optional(),
  not: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => NestedEnumCurrencyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCurrencyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCurrencyFilterSchema).optional()
}).strict();

export const NestedEnumCountryWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCountryWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CountrySchema).optional(),
  in: z.lazy(() => CountrySchema).array().optional(),
  notIn: z.lazy(() => CountrySchema).array().optional(),
  not: z.union([ z.lazy(() => CountrySchema),z.lazy(() => NestedEnumCountryWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCountryFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCountryFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedEnumProductOptionStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumProductOptionStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ProductOptionStatusSchema).optional(),
  in: z.lazy(() => ProductOptionStatusSchema).array().optional(),
  notIn: z.lazy(() => ProductOptionStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => NestedEnumProductOptionStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumProductOptionStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumProductOptionStatusFilterSchema).optional()
}).strict();

export const NestedEnumPurchaseOrderStatusFilterSchema: z.ZodType<Prisma.NestedEnumPurchaseOrderStatusFilter> = z.object({
  equals: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  in: z.lazy(() => PurchaseOrderStatusSchema).array().optional(),
  notIn: z.lazy(() => PurchaseOrderStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => NestedEnumPurchaseOrderStatusFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPurchaseOrderStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPurchaseOrderStatusWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  in: z.lazy(() => PurchaseOrderStatusSchema).array().optional(),
  notIn: z.lazy(() => PurchaseOrderStatusSchema).array().optional(),
  not: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => NestedEnumPurchaseOrderStatusWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPurchaseOrderStatusFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPurchaseOrderStatusFilterSchema).optional()
}).strict();

export const CompanyCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompanyUpsertWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneWithoutUsersNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneWithoutUsersNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const UserCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserCreateManyCompanyInputSchema),z.lazy(() => UserCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductCreateWithoutCompanyInputSchema: z.ZodType<Prisma.ProductCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  code: z.string().optional().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  options: z.lazy(() => ProductOptionCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  code: z.string().optional().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  options: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutProductInputSchema).optional()
}).strict();

export const ProductCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutCompanyInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const ProductCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.ProductCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductCreateManyCompanyInputSchema),z.lazy(() => ProductCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductOptionCreateWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOptionsInputSchema),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutProductOptionInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutProductOptionInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const ProductOptionCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.ProductOptionCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductOptionCreateManyCompanyInputSchema),z.lazy(() => ProductOptionCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PurchaseOrderCreateWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOption: z.lazy(() => ProductOptionCreateNestedOneWithoutPurchaseOrdersInputSchema)
}).strict();

export const PurchaseOrderUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string()
}).strict();

export const PurchaseOrderCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const PurchaseOrderCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.PurchaseOrderCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PurchaseOrderCreateManyCompanyInputSchema),z.lazy(() => PurchaseOrderCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SaleCreateWithoutCompanyInputSchema: z.ZodType<Prisma.SaleCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOption: z.lazy(() => ProductOptionCreateNestedOneWithoutSalesInputSchema),
  channel: z.lazy(() => SalesChannelCreateNestedOneWithoutSalesInputSchema)
}).strict();

export const SaleUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.SaleUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string(),
  channelId: z.string()
}).strict();

export const SaleCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.SaleCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SaleCreateWithoutCompanyInputSchema),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const SaleCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.SaleCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SaleCreateManyCompanyInputSchema),z.lazy(() => SaleCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SalesChannelCreateWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const SalesChannelUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutChannelInputSchema).optional()
}).strict();

export const SalesChannelCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => SalesChannelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const SalesChannelCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.SalesChannelCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SalesChannelCreateManyCompanyInputSchema),z.lazy(() => SalesChannelCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutCompanyInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutCompanyInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ProductUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.ProductUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductUpdateWithoutCompanyInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutCompanyInputSchema),z.lazy(() => ProductUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const ProductUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.ProductUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateWithoutCompanyInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const ProductUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.ProductUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => ProductScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductUpdateManyMutationInputSchema),z.lazy(() => ProductUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const ProductScalarWhereInputSchema: z.ZodType<Prisma.ProductScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductScalarWhereInputSchema),z.lazy(() => ProductScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  code: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  purchaseAt: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ProductOptionUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductOptionUpdateWithoutCompanyInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutCompanyInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const ProductOptionUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductOptionUpdateWithoutCompanyInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const ProductOptionUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => ProductOptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductOptionUpdateManyMutationInputSchema),z.lazy(() => ProductOptionUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const ProductOptionScalarWhereInputSchema: z.ZodType<Prisma.ProductOptionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProductOptionScalarWhereInputSchema),z.lazy(() => ProductOptionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProductOptionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProductOptionScalarWhereInputSchema),z.lazy(() => ProductOptionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  unitPrice: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  currency: z.union([ z.lazy(() => EnumCurrencyFilterSchema),z.lazy(() => CurrencySchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => EnumCountryFilterSchema),z.lazy(() => CountrySchema) ]).optional(),
  inventoryQuantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  leadtime: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => EnumProductOptionStatusFilterSchema),z.lazy(() => ProductOptionStatusSchema) ]).optional(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PurchaseOrderUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PurchaseOrderUpdateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const PurchaseOrderUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PurchaseOrderUpdateWithoutCompanyInputSchema),z.lazy(() => PurchaseOrderUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const PurchaseOrderUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => PurchaseOrderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PurchaseOrderUpdateManyMutationInputSchema),z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const PurchaseOrderScalarWhereInputSchema: z.ZodType<Prisma.PurchaseOrderScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PurchaseOrderScalarWhereInputSchema),z.lazy(() => PurchaseOrderScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PurchaseOrderScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PurchaseOrderScalarWhereInputSchema),z.lazy(() => PurchaseOrderScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  orderedQuantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  orderedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  receivedQuantity: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  receivedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => EnumPurchaseOrderStatusFilterSchema),z.lazy(() => PurchaseOrderStatusSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SaleUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.SaleUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SaleUpdateWithoutCompanyInputSchema),z.lazy(() => SaleUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => SaleCreateWithoutCompanyInputSchema),z.lazy(() => SaleUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const SaleUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.SaleUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SaleUpdateWithoutCompanyInputSchema),z.lazy(() => SaleUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const SaleUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.SaleUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => SaleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SaleUpdateManyMutationInputSchema),z.lazy(() => SaleUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const SaleScalarWhereInputSchema: z.ZodType<Prisma.SaleScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SaleScalarWhereInputSchema),z.lazy(() => SaleScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SaleScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SaleScalarWhereInputSchema),z.lazy(() => SaleScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  soldAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  productOptionId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  channelId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const SalesChannelUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => SalesChannelWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SalesChannelUpdateWithoutCompanyInputSchema),z.lazy(() => SalesChannelUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutCompanyInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const SalesChannelUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => SalesChannelWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SalesChannelUpdateWithoutCompanyInputSchema),z.lazy(() => SalesChannelUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const SalesChannelUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => SalesChannelScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SalesChannelUpdateManyMutationInputSchema),z.lazy(() => SalesChannelUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const SalesChannelScalarWhereInputSchema: z.ZodType<Prisma.SalesChannelScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SalesChannelScalarWhereInputSchema),z.lazy(() => SalesChannelScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SalesChannelScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SalesChannelScalarWhereInputSchema),z.lazy(() => SalesChannelScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CompanyCreateWithoutProductsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutProductsInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutProductsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutProductsInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutProductsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutProductsInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutProductsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutProductsInputSchema) ]),
}).strict();

export const ProductOptionCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutProductOptionsInputSchema),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutProductOptionInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionUncheckedCreateWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutProductOptionInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionCreateOrConnectWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutProductInput> = z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutProductInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ProductOptionCreateManyProductInputEnvelopeSchema: z.ZodType<Prisma.ProductOptionCreateManyProductInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProductOptionCreateManyProductInputSchema),z.lazy(() => ProductOptionCreateManyProductInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompanyUpsertWithoutProductsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutProductsInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutProductsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutProductsInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutProductsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutProductsInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutProductsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutProductsInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutProductsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutProductsInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutProductsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutProductsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutProductsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const ProductOptionUpsertWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionUpsertWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProductOptionUpdateWithoutProductInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutProductInputSchema) ]),
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutProductInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutProductInputSchema) ]),
}).strict();

export const ProductOptionUpdateWithWhereUniqueWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionUpdateWithWhereUniqueWithoutProductInput> = z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProductOptionUpdateWithoutProductInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutProductInputSchema) ]),
}).strict();

export const ProductOptionUpdateManyWithWhereWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionUpdateManyWithWhereWithoutProductInput> = z.object({
  where: z.lazy(() => ProductOptionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProductOptionUpdateManyMutationInputSchema),z.lazy(() => ProductOptionUncheckedUpdateManyWithoutProductInputSchema) ]),
}).strict();

export const ProductCreateWithoutOptionsInputSchema: z.ZodType<Prisma.ProductCreateWithoutOptionsInput> = z.object({
  id: z.string().cuid().optional(),
  code: z.string().optional().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutProductsInputSchema)
}).strict();

export const ProductUncheckedCreateWithoutOptionsInputSchema: z.ZodType<Prisma.ProductUncheckedCreateWithoutOptionsInput> = z.object({
  id: z.string().cuid().optional(),
  code: z.string().optional().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string()
}).strict();

export const ProductCreateOrConnectWithoutOptionsInputSchema: z.ZodType<Prisma.ProductCreateOrConnectWithoutOptionsInput> = z.object({
  where: z.lazy(() => ProductWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductCreateWithoutOptionsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOptionsInputSchema) ]),
}).strict();

export const CompanyCreateWithoutProductOptionsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutProductOptionsInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutProductOptionsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutProductOptionsInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutProductOptionsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutProductOptionsInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutProductOptionsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutProductOptionsInputSchema) ]),
}).strict();

export const PurchaseOrderCreateWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderCreateWithoutProductOptionInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutPurchaseOrdersInputSchema)
}).strict();

export const PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedCreateWithoutProductOptionInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string()
}).strict();

export const PurchaseOrderCreateOrConnectWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderCreateOrConnectWithoutProductOptionInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema) ]),
}).strict();

export const PurchaseOrderCreateManyProductOptionInputEnvelopeSchema: z.ZodType<Prisma.PurchaseOrderCreateManyProductOptionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PurchaseOrderCreateManyProductOptionInputSchema),z.lazy(() => PurchaseOrderCreateManyProductOptionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SaleCreateWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleCreateWithoutProductOptionInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  channel: z.lazy(() => SalesChannelCreateNestedOneWithoutSalesInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutSalesInputSchema)
}).strict();

export const SaleUncheckedCreateWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleUncheckedCreateWithoutProductOptionInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  channelId: z.string(),
  companyId: z.string()
}).strict();

export const SaleCreateOrConnectWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleCreateOrConnectWithoutProductOptionInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SaleCreateWithoutProductOptionInputSchema),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema) ]),
}).strict();

export const SaleCreateManyProductOptionInputEnvelopeSchema: z.ZodType<Prisma.SaleCreateManyProductOptionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SaleCreateManyProductOptionInputSchema),z.lazy(() => SaleCreateManyProductOptionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProductUpsertWithoutOptionsInputSchema: z.ZodType<Prisma.ProductUpsertWithoutOptionsInput> = z.object({
  update: z.union([ z.lazy(() => ProductUpdateWithoutOptionsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutOptionsInputSchema) ]),
  create: z.union([ z.lazy(() => ProductCreateWithoutOptionsInputSchema),z.lazy(() => ProductUncheckedCreateWithoutOptionsInputSchema) ]),
  where: z.lazy(() => ProductWhereInputSchema).optional()
}).strict();

export const ProductUpdateToOneWithWhereWithoutOptionsInputSchema: z.ZodType<Prisma.ProductUpdateToOneWithWhereWithoutOptionsInput> = z.object({
  where: z.lazy(() => ProductWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductUpdateWithoutOptionsInputSchema),z.lazy(() => ProductUncheckedUpdateWithoutOptionsInputSchema) ]),
}).strict();

export const ProductUpdateWithoutOptionsInputSchema: z.ZodType<Prisma.ProductUpdateWithoutOptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutProductsNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutOptionsInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutOptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUpsertWithoutProductOptionsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutProductOptionsInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutProductOptionsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutProductOptionsInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutProductOptionsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutProductOptionsInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutProductOptionsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutProductOptionsInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutProductOptionsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutProductOptionsInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutProductOptionsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutProductOptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutProductOptionsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutProductOptionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const PurchaseOrderUpsertWithWhereUniqueWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderUpsertWithWhereUniqueWithoutProductOptionInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PurchaseOrderUpdateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUncheckedUpdateWithoutProductOptionInputSchema) ]),
  create: z.union([ z.lazy(() => PurchaseOrderCreateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUncheckedCreateWithoutProductOptionInputSchema) ]),
}).strict();

export const PurchaseOrderUpdateWithWhereUniqueWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateWithWhereUniqueWithoutProductOptionInput> = z.object({
  where: z.lazy(() => PurchaseOrderWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PurchaseOrderUpdateWithoutProductOptionInputSchema),z.lazy(() => PurchaseOrderUncheckedUpdateWithoutProductOptionInputSchema) ]),
}).strict();

export const PurchaseOrderUpdateManyWithWhereWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateManyWithWhereWithoutProductOptionInput> = z.object({
  where: z.lazy(() => PurchaseOrderScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PurchaseOrderUpdateManyMutationInputSchema),z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutProductOptionInputSchema) ]),
}).strict();

export const SaleUpsertWithWhereUniqueWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleUpsertWithWhereUniqueWithoutProductOptionInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SaleUpdateWithoutProductOptionInputSchema),z.lazy(() => SaleUncheckedUpdateWithoutProductOptionInputSchema) ]),
  create: z.union([ z.lazy(() => SaleCreateWithoutProductOptionInputSchema),z.lazy(() => SaleUncheckedCreateWithoutProductOptionInputSchema) ]),
}).strict();

export const SaleUpdateWithWhereUniqueWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleUpdateWithWhereUniqueWithoutProductOptionInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SaleUpdateWithoutProductOptionInputSchema),z.lazy(() => SaleUncheckedUpdateWithoutProductOptionInputSchema) ]),
}).strict();

export const SaleUpdateManyWithWhereWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleUpdateManyWithWhereWithoutProductOptionInput> = z.object({
  where: z.lazy(() => SaleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SaleUpdateManyMutationInputSchema),z.lazy(() => SaleUncheckedUpdateManyWithoutProductOptionInputSchema) ]),
}).strict();

export const ProductOptionCreateWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.ProductOptionCreateWithoutPurchaseOrdersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOptionsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutProductOptionsInputSchema),
  sales: z.lazy(() => SaleCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionUncheckedCreateWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutPurchaseOrdersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string(),
  companyId: z.string(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionCreateOrConnectWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutPurchaseOrdersInput> = z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutPurchaseOrdersInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutPurchaseOrdersInputSchema) ]),
}).strict();

export const CompanyCreateWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.CompanyCreateWithoutPurchaseOrdersInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutPurchaseOrdersInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutPurchaseOrdersInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutPurchaseOrdersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutPurchaseOrdersInputSchema) ]),
}).strict();

export const ProductOptionUpsertWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.ProductOptionUpsertWithoutPurchaseOrdersInput> = z.object({
  update: z.union([ z.lazy(() => ProductOptionUpdateWithoutPurchaseOrdersInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutPurchaseOrdersInputSchema) ]),
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutPurchaseOrdersInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutPurchaseOrdersInputSchema) ]),
  where: z.lazy(() => ProductOptionWhereInputSchema).optional()
}).strict();

export const ProductOptionUpdateToOneWithWhereWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.ProductOptionUpdateToOneWithWhereWithoutPurchaseOrdersInput> = z.object({
  where: z.lazy(() => ProductOptionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductOptionUpdateWithoutPurchaseOrdersInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutPurchaseOrdersInputSchema) ]),
}).strict();

export const ProductOptionUpdateWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.ProductOptionUpdateWithoutPurchaseOrdersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOptionsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutProductOptionsNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const ProductOptionUncheckedUpdateWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateWithoutPurchaseOrdersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const CompanyUpsertWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutPurchaseOrdersInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutPurchaseOrdersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutPurchaseOrdersInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutPurchaseOrdersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutPurchaseOrdersInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutPurchaseOrdersInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutPurchaseOrdersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutPurchaseOrdersInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutPurchaseOrdersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutPurchaseOrdersInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutPurchaseOrdersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const ProductOptionCreateWithoutSalesInputSchema: z.ZodType<Prisma.ProductOptionCreateWithoutSalesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  product: z.lazy(() => ProductCreateNestedOneWithoutOptionsInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutProductOptionsInputSchema),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.ProductOptionUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string(),
  companyId: z.string(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutProductOptionInputSchema).optional()
}).strict();

export const ProductOptionCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.ProductOptionCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => ProductOptionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutSalesInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const SalesChannelCreateWithoutSalesInputSchema: z.ZodType<Prisma.SalesChannelCreateWithoutSalesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutSalesChannelsInputSchema)
}).strict();

export const SalesChannelUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.SalesChannelUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string()
}).strict();

export const SalesChannelCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.SalesChannelCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => SalesChannelWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutSalesInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const CompanyCreateWithoutSalesInputSchema: z.ZodType<Prisma.CompanyCreateWithoutSalesInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutSalesInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutSalesInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutSalesInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutSalesInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutSalesInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSalesInputSchema) ]),
}).strict();

export const ProductOptionUpsertWithoutSalesInputSchema: z.ZodType<Prisma.ProductOptionUpsertWithoutSalesInput> = z.object({
  update: z.union([ z.lazy(() => ProductOptionUpdateWithoutSalesInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => ProductOptionCreateWithoutSalesInputSchema),z.lazy(() => ProductOptionUncheckedCreateWithoutSalesInputSchema) ]),
  where: z.lazy(() => ProductOptionWhereInputSchema).optional()
}).strict();

export const ProductOptionUpdateToOneWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.ProductOptionUpdateToOneWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => ProductOptionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProductOptionUpdateWithoutSalesInputSchema),z.lazy(() => ProductOptionUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const ProductOptionUpdateWithoutSalesInputSchema: z.ZodType<Prisma.ProductOptionUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOptionsNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutProductOptionsNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const ProductOptionUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const SalesChannelUpsertWithoutSalesInputSchema: z.ZodType<Prisma.SalesChannelUpsertWithoutSalesInput> = z.object({
  update: z.union([ z.lazy(() => SalesChannelUpdateWithoutSalesInputSchema),z.lazy(() => SalesChannelUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => SalesChannelCreateWithoutSalesInputSchema),z.lazy(() => SalesChannelUncheckedCreateWithoutSalesInputSchema) ]),
  where: z.lazy(() => SalesChannelWhereInputSchema).optional()
}).strict();

export const SalesChannelUpdateToOneWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.SalesChannelUpdateToOneWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => SalesChannelWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => SalesChannelUpdateWithoutSalesInputSchema),z.lazy(() => SalesChannelUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const SalesChannelUpdateWithoutSalesInputSchema: z.ZodType<Prisma.SalesChannelUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutSalesChannelsNestedInputSchema).optional()
}).strict();

export const SalesChannelUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.SalesChannelUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUpsertWithoutSalesInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutSalesInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutSalesInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSalesInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutSalesInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSalesInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutSalesInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutSalesInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutSalesInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSalesInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutSalesInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutSalesInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutSalesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  salesChannels: z.lazy(() => SalesChannelUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyCreateWithoutSalesChannelsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutSalesChannelsInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutSalesChannelsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutSalesChannelsInput> = z.object({
  id: z.string().cuid().optional(),
  crn: z.string(),
  name: z.string(),
  phone: z.string().optional().nullable(),
  registeredAt: z.coerce.date().optional().nullable(),
  repName: z.string(),
  repMobile: z.string(),
  certificateUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  users: z.lazy(() => UserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutSalesChannelsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutSalesChannelsInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutSalesChannelsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSalesChannelsInputSchema) ]),
}).strict();

export const SaleCreateWithoutChannelInputSchema: z.ZodType<Prisma.SaleCreateWithoutChannelInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOption: z.lazy(() => ProductOptionCreateNestedOneWithoutSalesInputSchema),
  company: z.lazy(() => CompanyCreateNestedOneWithoutSalesInputSchema)
}).strict();

export const SaleUncheckedCreateWithoutChannelInputSchema: z.ZodType<Prisma.SaleUncheckedCreateWithoutChannelInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string(),
  companyId: z.string()
}).strict();

export const SaleCreateOrConnectWithoutChannelInputSchema: z.ZodType<Prisma.SaleCreateOrConnectWithoutChannelInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SaleCreateWithoutChannelInputSchema),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema) ]),
}).strict();

export const SaleCreateManyChannelInputEnvelopeSchema: z.ZodType<Prisma.SaleCreateManyChannelInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SaleCreateManyChannelInputSchema),z.lazy(() => SaleCreateManyChannelInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompanyUpsertWithoutSalesChannelsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutSalesChannelsInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutSalesChannelsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSalesChannelsInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutSalesChannelsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutSalesChannelsInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutSalesChannelsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutSalesChannelsInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutSalesChannelsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutSalesChannelsInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutSalesChannelsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutSalesChannelsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutSalesChannelsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutSalesChannelsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  crn: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  registeredAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  repName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repMobile: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  certificateUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => UserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  products: z.lazy(() => ProductUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  productOptions: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const SaleUpsertWithWhereUniqueWithoutChannelInputSchema: z.ZodType<Prisma.SaleUpsertWithWhereUniqueWithoutChannelInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SaleUpdateWithoutChannelInputSchema),z.lazy(() => SaleUncheckedUpdateWithoutChannelInputSchema) ]),
  create: z.union([ z.lazy(() => SaleCreateWithoutChannelInputSchema),z.lazy(() => SaleUncheckedCreateWithoutChannelInputSchema) ]),
}).strict();

export const SaleUpdateWithWhereUniqueWithoutChannelInputSchema: z.ZodType<Prisma.SaleUpdateWithWhereUniqueWithoutChannelInput> = z.object({
  where: z.lazy(() => SaleWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SaleUpdateWithoutChannelInputSchema),z.lazy(() => SaleUncheckedUpdateWithoutChannelInputSchema) ]),
}).strict();

export const SaleUpdateManyWithWhereWithoutChannelInputSchema: z.ZodType<Prisma.SaleUpdateManyWithWhereWithoutChannelInput> = z.object({
  where: z.lazy(() => SaleScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SaleUpdateManyMutationInputSchema),z.lazy(() => SaleUncheckedUpdateManyWithoutChannelInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  sessionToken: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyCompanyInputSchema: z.ZodType<Prisma.UserCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.coerce.date().optional().nullable(),
  password: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductCreateManyCompanyInputSchema: z.ZodType<Prisma.ProductCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  code: z.string().optional().nullable(),
  name: z.string(),
  purchaseAt: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProductOptionCreateManyCompanyInputSchema: z.ZodType<Prisma.ProductOptionCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productId: z.string()
}).strict();

export const PurchaseOrderCreateManyCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string()
}).strict();

export const SaleCreateManyCompanyInputSchema: z.ZodType<Prisma.SaleCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string(),
  channelId: z.string()
}).strict();

export const SalesChannelCreateManyCompanyInputSchema: z.ZodType<Prisma.SalesChannelCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.ProductUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.lazy(() => ProductOptionUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  options: z.lazy(() => ProductOptionUncheckedUpdateManyWithoutProductNestedInputSchema).optional()
}).strict();

export const ProductUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.ProductUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  code: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseAt: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductOptionUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  product: z.lazy(() => ProductUpdateOneRequiredWithoutOptionsNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutProductOptionNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const ProductOptionUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutProductOptionNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const ProductOptionUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOption: z.lazy(() => ProductOptionUpdateOneRequiredWithoutPurchaseOrdersNestedInputSchema).optional()
}).strict();

export const PurchaseOrderUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.SaleUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOption: z.lazy(() => ProductOptionUpdateOneRequiredWithoutSalesNestedInputSchema).optional(),
  channel: z.lazy(() => SalesChannelUpdateOneRequiredWithoutSalesNestedInputSchema).optional()
}).strict();

export const SaleUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SalesChannelUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const SalesChannelUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutChannelNestedInputSchema).optional()
}).strict();

export const SalesChannelUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.SalesChannelUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProductOptionCreateManyProductInputSchema: z.ZodType<Prisma.ProductOptionCreateManyProductInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  imageUrl: z.string().optional().nullable(),
  unitPrice: z.number().optional(),
  currency: z.lazy(() => CurrencySchema).optional(),
  importedFrom: z.lazy(() => CountrySchema).optional(),
  inventoryQuantity: z.number().int().optional(),
  leadtime: z.number().int().optional(),
  status: z.lazy(() => ProductOptionStatusSchema).optional(),
  location: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string()
}).strict();

export const ProductOptionUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutProductOptionsNestedInputSchema).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUpdateManyWithoutProductOptionNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const ProductOptionUncheckedUpdateWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  purchaseOrders: z.lazy(() => PurchaseOrderUncheckedUpdateManyWithoutProductOptionNestedInputSchema).optional(),
  sales: z.lazy(() => SaleUncheckedUpdateManyWithoutProductOptionNestedInputSchema).optional()
}).strict();

export const ProductOptionUncheckedUpdateManyWithoutProductInputSchema: z.ZodType<Prisma.ProductOptionUncheckedUpdateManyWithoutProductInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  unitPrice: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  importedFrom: z.union([ z.lazy(() => CountrySchema),z.lazy(() => EnumCountryFieldUpdateOperationsInputSchema) ]).optional(),
  inventoryQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  leadtime: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => ProductOptionStatusSchema),z.lazy(() => EnumProductOptionStatusFieldUpdateOperationsInputSchema) ]).optional(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderCreateManyProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderCreateManyProductOptionInput> = z.object({
  id: z.string().cuid().optional(),
  orderedQuantity: z.number().int().optional(),
  orderedAt: z.coerce.date(),
  receivedQuantity: z.number().int().optional().nullable(),
  receivedAt: z.coerce.date().optional().nullable(),
  status: z.lazy(() => PurchaseOrderStatusSchema).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  companyId: z.string()
}).strict();

export const SaleCreateManyProductOptionInputSchema: z.ZodType<Prisma.SaleCreateManyProductOptionInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  channelId: z.string(),
  companyId: z.string()
}).strict();

export const PurchaseOrderUpdateWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderUpdateWithoutProductOptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutPurchaseOrdersNestedInputSchema).optional()
}).strict();

export const PurchaseOrderUncheckedUpdateWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedUpdateWithoutProductOptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PurchaseOrderUncheckedUpdateManyWithoutProductOptionInputSchema: z.ZodType<Prisma.PurchaseOrderUncheckedUpdateManyWithoutProductOptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  orderedQuantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  orderedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  receivedQuantity: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  receivedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.lazy(() => PurchaseOrderStatusSchema),z.lazy(() => EnumPurchaseOrderStatusFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleUpdateWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleUpdateWithoutProductOptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  channel: z.lazy(() => SalesChannelUpdateOneRequiredWithoutSalesNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutSalesNestedInputSchema).optional()
}).strict();

export const SaleUncheckedUpdateWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateWithoutProductOptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleUncheckedUpdateManyWithoutProductOptionInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateManyWithoutProductOptionInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  channelId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleCreateManyChannelInputSchema: z.ZodType<Prisma.SaleCreateManyChannelInput> = z.object({
  id: z.string().cuid().optional(),
  quantity: z.number().int().optional(),
  soldAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  productOptionId: z.string(),
  companyId: z.string()
}).strict();

export const SaleUpdateWithoutChannelInputSchema: z.ZodType<Prisma.SaleUpdateWithoutChannelInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOption: z.lazy(() => ProductOptionUpdateOneRequiredWithoutSalesNestedInputSchema).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutSalesNestedInputSchema).optional()
}).strict();

export const SaleUncheckedUpdateWithoutChannelInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateWithoutChannelInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SaleUncheckedUpdateManyWithoutChannelInputSchema: z.ZodType<Prisma.SaleUncheckedUpdateManyWithoutChannelInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  soldAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  productOptionId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationAndSearchRelevanceInputSchema.array(),UserOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationAndSearchRelevanceInputSchema.array(),UserOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationAndSearchRelevanceInputSchema.array(),UserOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationAndSearchRelevanceInputSchema.array(),UserOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationAndSearchRelevanceInputSchema.array(),AccountOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationAndSearchRelevanceInputSchema.array(),AccountOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationAndSearchRelevanceInputSchema.array(),AccountOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationAndSearchRelevanceInputSchema.array(),AccountOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationAndSearchRelevanceInputSchema.array(),SessionOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationAndSearchRelevanceInputSchema.array(),SessionOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationAndSearchRelevanceInputSchema.array(),SessionOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationAndSearchRelevanceInputSchema.array(),SessionOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationAndSearchRelevanceInputSchema.array(),CompanyOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationAndSearchRelevanceInputSchema.array(),CompanyOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationAndSearchRelevanceInputSchema.array(),CompanyOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationAndSearchRelevanceInputSchema.array(),CompanyOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithAggregationInputSchema.array(),CompanyOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyScalarFieldEnumSchema.array(),
  having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const ProductFindFirstArgsSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationAndSearchRelevanceInputSchema.array(),ProductOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductFindFirstOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationAndSearchRelevanceInputSchema.array(),ProductOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductFindManyArgsSchema: z.ZodType<Prisma.ProductFindManyArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationAndSearchRelevanceInputSchema.array(),ProductOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductScalarFieldEnumSchema,ProductScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductAggregateArgsSchema: z.ZodType<Prisma.ProductAggregateArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithRelationAndSearchRelevanceInputSchema.array(),ProductOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: ProductWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductGroupByArgsSchema: z.ZodType<Prisma.ProductGroupByArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
  orderBy: z.union([ ProductOrderByWithAggregationInputSchema.array(),ProductOrderByWithAggregationInputSchema ]).optional(),
  by: ProductScalarFieldEnumSchema.array(),
  having: ProductScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductFindUniqueArgsSchema: z.ZodType<Prisma.ProductFindUniqueArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductOptionFindFirstArgsSchema: z.ZodType<Prisma.ProductOptionFindFirstArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  where: ProductOptionWhereInputSchema.optional(),
  orderBy: z.union([ ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema.array(),ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: ProductOptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductOptionScalarFieldEnumSchema,ProductOptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductOptionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProductOptionFindFirstOrThrowArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  where: ProductOptionWhereInputSchema.optional(),
  orderBy: z.union([ ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema.array(),ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: ProductOptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductOptionScalarFieldEnumSchema,ProductOptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductOptionFindManyArgsSchema: z.ZodType<Prisma.ProductOptionFindManyArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  where: ProductOptionWhereInputSchema.optional(),
  orderBy: z.union([ ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema.array(),ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: ProductOptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProductOptionScalarFieldEnumSchema,ProductOptionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProductOptionAggregateArgsSchema: z.ZodType<Prisma.ProductOptionAggregateArgs> = z.object({
  where: ProductOptionWhereInputSchema.optional(),
  orderBy: z.union([ ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema.array(),ProductOptionOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: ProductOptionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductOptionGroupByArgsSchema: z.ZodType<Prisma.ProductOptionGroupByArgs> = z.object({
  where: ProductOptionWhereInputSchema.optional(),
  orderBy: z.union([ ProductOptionOrderByWithAggregationInputSchema.array(),ProductOptionOrderByWithAggregationInputSchema ]).optional(),
  by: ProductOptionScalarFieldEnumSchema.array(),
  having: ProductOptionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProductOptionFindUniqueArgsSchema: z.ZodType<Prisma.ProductOptionFindUniqueArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  where: ProductOptionWhereUniqueInputSchema,
}).strict() ;

export const ProductOptionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProductOptionFindUniqueOrThrowArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  where: ProductOptionWhereUniqueInputSchema,
}).strict() ;

export const PurchaseOrderFindFirstArgsSchema: z.ZodType<Prisma.PurchaseOrderFindFirstArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([ PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema.array(),PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: PurchaseOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PurchaseOrderScalarFieldEnumSchema,PurchaseOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PurchaseOrderFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PurchaseOrderFindFirstOrThrowArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([ PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema.array(),PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: PurchaseOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PurchaseOrderScalarFieldEnumSchema,PurchaseOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PurchaseOrderFindManyArgsSchema: z.ZodType<Prisma.PurchaseOrderFindManyArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([ PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema.array(),PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: PurchaseOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PurchaseOrderScalarFieldEnumSchema,PurchaseOrderScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PurchaseOrderAggregateArgsSchema: z.ZodType<Prisma.PurchaseOrderAggregateArgs> = z.object({
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([ PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema.array(),PurchaseOrderOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: PurchaseOrderWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PurchaseOrderGroupByArgsSchema: z.ZodType<Prisma.PurchaseOrderGroupByArgs> = z.object({
  where: PurchaseOrderWhereInputSchema.optional(),
  orderBy: z.union([ PurchaseOrderOrderByWithAggregationInputSchema.array(),PurchaseOrderOrderByWithAggregationInputSchema ]).optional(),
  by: PurchaseOrderScalarFieldEnumSchema.array(),
  having: PurchaseOrderScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PurchaseOrderFindUniqueArgsSchema: z.ZodType<Prisma.PurchaseOrderFindUniqueArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereUniqueInputSchema,
}).strict() ;

export const PurchaseOrderFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PurchaseOrderFindUniqueOrThrowArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereUniqueInputSchema,
}).strict() ;

export const SaleFindFirstArgsSchema: z.ZodType<Prisma.SaleFindFirstArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  where: SaleWhereInputSchema.optional(),
  orderBy: z.union([ SaleOrderByWithRelationAndSearchRelevanceInputSchema.array(),SaleOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SaleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SaleScalarFieldEnumSchema,SaleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SaleFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SaleFindFirstOrThrowArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  where: SaleWhereInputSchema.optional(),
  orderBy: z.union([ SaleOrderByWithRelationAndSearchRelevanceInputSchema.array(),SaleOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SaleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SaleScalarFieldEnumSchema,SaleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SaleFindManyArgsSchema: z.ZodType<Prisma.SaleFindManyArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  where: SaleWhereInputSchema.optional(),
  orderBy: z.union([ SaleOrderByWithRelationAndSearchRelevanceInputSchema.array(),SaleOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SaleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SaleScalarFieldEnumSchema,SaleScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SaleAggregateArgsSchema: z.ZodType<Prisma.SaleAggregateArgs> = z.object({
  where: SaleWhereInputSchema.optional(),
  orderBy: z.union([ SaleOrderByWithRelationAndSearchRelevanceInputSchema.array(),SaleOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SaleWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SaleGroupByArgsSchema: z.ZodType<Prisma.SaleGroupByArgs> = z.object({
  where: SaleWhereInputSchema.optional(),
  orderBy: z.union([ SaleOrderByWithAggregationInputSchema.array(),SaleOrderByWithAggregationInputSchema ]).optional(),
  by: SaleScalarFieldEnumSchema.array(),
  having: SaleScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SaleFindUniqueArgsSchema: z.ZodType<Prisma.SaleFindUniqueArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  where: SaleWhereUniqueInputSchema,
}).strict() ;

export const SaleFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SaleFindUniqueOrThrowArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  where: SaleWhereUniqueInputSchema,
}).strict() ;

export const SalesChannelFindFirstArgsSchema: z.ZodType<Prisma.SalesChannelFindFirstArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  where: SalesChannelWhereInputSchema.optional(),
  orderBy: z.union([ SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema.array(),SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SalesChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SalesChannelScalarFieldEnumSchema,SalesChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SalesChannelFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SalesChannelFindFirstOrThrowArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  where: SalesChannelWhereInputSchema.optional(),
  orderBy: z.union([ SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema.array(),SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SalesChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SalesChannelScalarFieldEnumSchema,SalesChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SalesChannelFindManyArgsSchema: z.ZodType<Prisma.SalesChannelFindManyArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  where: SalesChannelWhereInputSchema.optional(),
  orderBy: z.union([ SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema.array(),SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SalesChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SalesChannelScalarFieldEnumSchema,SalesChannelScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SalesChannelAggregateArgsSchema: z.ZodType<Prisma.SalesChannelAggregateArgs> = z.object({
  where: SalesChannelWhereInputSchema.optional(),
  orderBy: z.union([ SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema.array(),SalesChannelOrderByWithRelationAndSearchRelevanceInputSchema ]).optional(),
  cursor: SalesChannelWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SalesChannelGroupByArgsSchema: z.ZodType<Prisma.SalesChannelGroupByArgs> = z.object({
  where: SalesChannelWhereInputSchema.optional(),
  orderBy: z.union([ SalesChannelOrderByWithAggregationInputSchema.array(),SalesChannelOrderByWithAggregationInputSchema ]).optional(),
  by: SalesChannelScalarFieldEnumSchema.array(),
  having: SalesChannelScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SalesChannelFindUniqueArgsSchema: z.ZodType<Prisma.SalesChannelFindUniqueArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  where: SalesChannelWhereUniqueInputSchema,
}).strict() ;

export const SalesChannelFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SalesChannelFindUniqueOrThrowArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  where: SalesChannelWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
}).strict() ;

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
  create: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
  update: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
}).strict() ;

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema,CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CompanyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CompanyCreateManyAndReturnArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema,CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema,CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(),
}).strict() ;

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
}).strict() ;

export const ProductCreateArgsSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
}).strict() ;

export const ProductUpsertArgsSchema: z.ZodType<Prisma.ProductUpsertArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
  create: z.union([ ProductCreateInputSchema,ProductUncheckedCreateInputSchema ]),
  update: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProductCreateManyArgsSchema: z.ZodType<Prisma.ProductCreateManyArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema,ProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProductCreateManyInputSchema,ProductCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductDeleteArgsSchema: z.ZodType<Prisma.ProductDeleteArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductUpdateArgsSchema: z.ZodType<Prisma.ProductUpdateArgs> = z.object({
  select: ProductSelectSchema.optional(),
  include: ProductIncludeSchema.optional(),
  data: z.union([ ProductUpdateInputSchema,ProductUncheckedUpdateInputSchema ]),
  where: ProductWhereUniqueInputSchema,
}).strict() ;

export const ProductUpdateManyArgsSchema: z.ZodType<Prisma.ProductUpdateManyArgs> = z.object({
  data: z.union([ ProductUpdateManyMutationInputSchema,ProductUncheckedUpdateManyInputSchema ]),
  where: ProductWhereInputSchema.optional(),
}).strict() ;

export const ProductDeleteManyArgsSchema: z.ZodType<Prisma.ProductDeleteManyArgs> = z.object({
  where: ProductWhereInputSchema.optional(),
}).strict() ;

export const ProductOptionCreateArgsSchema: z.ZodType<Prisma.ProductOptionCreateArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  data: z.union([ ProductOptionCreateInputSchema,ProductOptionUncheckedCreateInputSchema ]),
}).strict() ;

export const ProductOptionUpsertArgsSchema: z.ZodType<Prisma.ProductOptionUpsertArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  where: ProductOptionWhereUniqueInputSchema,
  create: z.union([ ProductOptionCreateInputSchema,ProductOptionUncheckedCreateInputSchema ]),
  update: z.union([ ProductOptionUpdateInputSchema,ProductOptionUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProductOptionCreateManyArgsSchema: z.ZodType<Prisma.ProductOptionCreateManyArgs> = z.object({
  data: z.union([ ProductOptionCreateManyInputSchema,ProductOptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductOptionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProductOptionCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProductOptionCreateManyInputSchema,ProductOptionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProductOptionDeleteArgsSchema: z.ZodType<Prisma.ProductOptionDeleteArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  where: ProductOptionWhereUniqueInputSchema,
}).strict() ;

export const ProductOptionUpdateArgsSchema: z.ZodType<Prisma.ProductOptionUpdateArgs> = z.object({
  select: ProductOptionSelectSchema.optional(),
  include: ProductOptionIncludeSchema.optional(),
  data: z.union([ ProductOptionUpdateInputSchema,ProductOptionUncheckedUpdateInputSchema ]),
  where: ProductOptionWhereUniqueInputSchema,
}).strict() ;

export const ProductOptionUpdateManyArgsSchema: z.ZodType<Prisma.ProductOptionUpdateManyArgs> = z.object({
  data: z.union([ ProductOptionUpdateManyMutationInputSchema,ProductOptionUncheckedUpdateManyInputSchema ]),
  where: ProductOptionWhereInputSchema.optional(),
}).strict() ;

export const ProductOptionDeleteManyArgsSchema: z.ZodType<Prisma.ProductOptionDeleteManyArgs> = z.object({
  where: ProductOptionWhereInputSchema.optional(),
}).strict() ;

export const PurchaseOrderCreateArgsSchema: z.ZodType<Prisma.PurchaseOrderCreateArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  data: z.union([ PurchaseOrderCreateInputSchema,PurchaseOrderUncheckedCreateInputSchema ]),
}).strict() ;

export const PurchaseOrderUpsertArgsSchema: z.ZodType<Prisma.PurchaseOrderUpsertArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereUniqueInputSchema,
  create: z.union([ PurchaseOrderCreateInputSchema,PurchaseOrderUncheckedCreateInputSchema ]),
  update: z.union([ PurchaseOrderUpdateInputSchema,PurchaseOrderUncheckedUpdateInputSchema ]),
}).strict() ;

export const PurchaseOrderCreateManyArgsSchema: z.ZodType<Prisma.PurchaseOrderCreateManyArgs> = z.object({
  data: z.union([ PurchaseOrderCreateManyInputSchema,PurchaseOrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PurchaseOrderCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PurchaseOrderCreateManyAndReturnArgs> = z.object({
  data: z.union([ PurchaseOrderCreateManyInputSchema,PurchaseOrderCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PurchaseOrderDeleteArgsSchema: z.ZodType<Prisma.PurchaseOrderDeleteArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  where: PurchaseOrderWhereUniqueInputSchema,
}).strict() ;

export const PurchaseOrderUpdateArgsSchema: z.ZodType<Prisma.PurchaseOrderUpdateArgs> = z.object({
  select: PurchaseOrderSelectSchema.optional(),
  include: PurchaseOrderIncludeSchema.optional(),
  data: z.union([ PurchaseOrderUpdateInputSchema,PurchaseOrderUncheckedUpdateInputSchema ]),
  where: PurchaseOrderWhereUniqueInputSchema,
}).strict() ;

export const PurchaseOrderUpdateManyArgsSchema: z.ZodType<Prisma.PurchaseOrderUpdateManyArgs> = z.object({
  data: z.union([ PurchaseOrderUpdateManyMutationInputSchema,PurchaseOrderUncheckedUpdateManyInputSchema ]),
  where: PurchaseOrderWhereInputSchema.optional(),
}).strict() ;

export const PurchaseOrderDeleteManyArgsSchema: z.ZodType<Prisma.PurchaseOrderDeleteManyArgs> = z.object({
  where: PurchaseOrderWhereInputSchema.optional(),
}).strict() ;

export const SaleCreateArgsSchema: z.ZodType<Prisma.SaleCreateArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  data: z.union([ SaleCreateInputSchema,SaleUncheckedCreateInputSchema ]),
}).strict() ;

export const SaleUpsertArgsSchema: z.ZodType<Prisma.SaleUpsertArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  where: SaleWhereUniqueInputSchema,
  create: z.union([ SaleCreateInputSchema,SaleUncheckedCreateInputSchema ]),
  update: z.union([ SaleUpdateInputSchema,SaleUncheckedUpdateInputSchema ]),
}).strict() ;

export const SaleCreateManyArgsSchema: z.ZodType<Prisma.SaleCreateManyArgs> = z.object({
  data: z.union([ SaleCreateManyInputSchema,SaleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SaleCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SaleCreateManyAndReturnArgs> = z.object({
  data: z.union([ SaleCreateManyInputSchema,SaleCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SaleDeleteArgsSchema: z.ZodType<Prisma.SaleDeleteArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  where: SaleWhereUniqueInputSchema,
}).strict() ;

export const SaleUpdateArgsSchema: z.ZodType<Prisma.SaleUpdateArgs> = z.object({
  select: SaleSelectSchema.optional(),
  include: SaleIncludeSchema.optional(),
  data: z.union([ SaleUpdateInputSchema,SaleUncheckedUpdateInputSchema ]),
  where: SaleWhereUniqueInputSchema,
}).strict() ;

export const SaleUpdateManyArgsSchema: z.ZodType<Prisma.SaleUpdateManyArgs> = z.object({
  data: z.union([ SaleUpdateManyMutationInputSchema,SaleUncheckedUpdateManyInputSchema ]),
  where: SaleWhereInputSchema.optional(),
}).strict() ;

export const SaleDeleteManyArgsSchema: z.ZodType<Prisma.SaleDeleteManyArgs> = z.object({
  where: SaleWhereInputSchema.optional(),
}).strict() ;

export const SalesChannelCreateArgsSchema: z.ZodType<Prisma.SalesChannelCreateArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  data: z.union([ SalesChannelCreateInputSchema,SalesChannelUncheckedCreateInputSchema ]),
}).strict() ;

export const SalesChannelUpsertArgsSchema: z.ZodType<Prisma.SalesChannelUpsertArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  where: SalesChannelWhereUniqueInputSchema,
  create: z.union([ SalesChannelCreateInputSchema,SalesChannelUncheckedCreateInputSchema ]),
  update: z.union([ SalesChannelUpdateInputSchema,SalesChannelUncheckedUpdateInputSchema ]),
}).strict() ;

export const SalesChannelCreateManyArgsSchema: z.ZodType<Prisma.SalesChannelCreateManyArgs> = z.object({
  data: z.union([ SalesChannelCreateManyInputSchema,SalesChannelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SalesChannelCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SalesChannelCreateManyAndReturnArgs> = z.object({
  data: z.union([ SalesChannelCreateManyInputSchema,SalesChannelCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SalesChannelDeleteArgsSchema: z.ZodType<Prisma.SalesChannelDeleteArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  where: SalesChannelWhereUniqueInputSchema,
}).strict() ;

export const SalesChannelUpdateArgsSchema: z.ZodType<Prisma.SalesChannelUpdateArgs> = z.object({
  select: SalesChannelSelectSchema.optional(),
  include: SalesChannelIncludeSchema.optional(),
  data: z.union([ SalesChannelUpdateInputSchema,SalesChannelUncheckedUpdateInputSchema ]),
  where: SalesChannelWhereUniqueInputSchema,
}).strict() ;

export const SalesChannelUpdateManyArgsSchema: z.ZodType<Prisma.SalesChannelUpdateManyArgs> = z.object({
  data: z.union([ SalesChannelUpdateManyMutationInputSchema,SalesChannelUncheckedUpdateManyInputSchema ]),
  where: SalesChannelWhereInputSchema.optional(),
}).strict() ;

export const SalesChannelDeleteManyArgsSchema: z.ZodType<Prisma.SalesChannelDeleteManyArgs> = z.object({
  where: SalesChannelWhereInputSchema.optional(),
}).strict() ;