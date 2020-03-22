﻿CREATE TABLE [dbo].[VendorUserLogin](
	[LoginProvider] NVARCHAR(15) NOT NULL,
	[ProviderKey] NVARCHAR(150) NOT NULL,
	[UserId] [int] NOT NULL,
	[ProviderDisplayName] NVARCHAR(max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[VendorUserLogin]  WITH CHECK ADD  CONSTRAINT [FK_VendorUserLogin_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[VendorUser] ([Id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[VendorUserLogin] CHECK CONSTRAINT [FK_VendorUserLogin_UserId]
GO
ALTER TABLE [dbo].[VendorUserLogin] ADD  CONSTRAINT [PK_VendorUserLogin] PRIMARY KEY CLUSTERED 
(
	[ProviderKey] ASC,
	[LoginProvider] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
CREATE NONCLUSTERED INDEX [IX_VendorUserLogin_UserId] ON [dbo].[VendorUserLogin]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]